/**
 * API Client for Team1 Africa Backend
 * Base URL: http://localhost:3000/api/v1
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Generic API Response wrapper
 */
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

/**
 * Paginated response structure
 */
interface PaginatedData<T> {
    items: T[];
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
    };
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    status?: number;
    response?: any;

    constructor(
        message: string,
        status?: number,
        response?: any
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.response = response;
    }
}

/**
 * Generic fetch wrapper with error handling and response unwrapping
 */
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        // Handle non-OK responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                errorData.message || `HTTP Error: ${response.status}`,
                response.status,
                errorData
            );
        }

        // Parse JSON response
        const jsonResponse: ApiResponse<T> = await response.json();

        // Unwrap the response
        if (!jsonResponse.success) {
            throw new ApiError(
                jsonResponse.message || 'API request failed',
                response.status,
                jsonResponse
            );
        }

        return jsonResponse.data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Network or parsing errors
        throw new ApiError(
            error instanceof Error ? error.message : 'Unknown error occurred',
            undefined,
            error
        );
    }
}

/**
 * API Client Methods
 */
export const api = {
    // ==================== EVENTS ====================

    /**
     * Get all events with optional filtering
     */
    async getEvents(params?: {
        status?: 'draft' | 'upcoming' | 'completed' | 'cancelled';
        limit?: number;
        page?: number;
    }): Promise<PaginatedData<Event>> {
        const queryParams = new URLSearchParams();

        if (params?.status) queryParams.append('status', params.status);
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.page) queryParams.append('page', params.page.toString());

        const query = queryParams.toString();
        const endpoint = `/events${query ? `?${query}` : ''}`;

        return apiFetch<PaginatedData<Event>>(endpoint);
    },

    /**
     * Get a single event by ID
     */
    async getEvent(id: string): Promise<Event> {
        return apiFetch<Event>(`/events/${id}`);
    },

    /**
     * Get upcoming events (status = 'upcoming')
     */
    async getUpcomingEvents(): Promise<Event[]> {
        const data = await this.getEvents({ status: 'upcoming' });
        return data.items;
    },

    /**
     * Get completed events (status = 'completed')
     */
    async getCompletedEvents(): Promise<Event[]> {
        const data = await this.getEvents({ status: 'completed' });
        return data.items;
    },

    // ==================== GALLERY ====================

    /**
     * Get gallery images, optionally filtered by event ID
     */
    async getGalleryImages(eventId?: string): Promise<PaginatedData<GalleryImage>> {
        const endpoint = eventId
            ? `/gallery?eventId=${eventId}`
            : '/gallery';

        return apiFetch<PaginatedData<GalleryImage>>(endpoint);
    },

    /**
     * Get all gallery images for a specific event
     */
    async getEventGallery(eventId: string): Promise<GalleryImage[]> {
        const data = await this.getGalleryImages(eventId);
        return data.items;
    },

    /**
     * Get all gallery images (all completed events)
     */
    async getAllGalleryImages(): Promise<GalleryImage[]> {
        const data = await this.getGalleryImages();
        return data.items;
    },

    // ==================== BLOGS ====================

    /**
     * Get all blog posts
     */
    async getBlogs(params?: {
        limit?: number;
        page?: number;
    }): Promise<PaginatedData<Blog>> {
        const queryParams = new URLSearchParams();

        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.page) queryParams.append('page', params.page.toString());

        const query = queryParams.toString();
        const endpoint = `/blogs${query ? `?${query}` : ''}`;

        return apiFetch<PaginatedData<Blog>>(endpoint);
    },

    /**
     * Get a single blog post by ID
     */
    async getBlog(id: string): Promise<Blog> {
        return apiFetch<Blog>(`/blogs/${id}`);
    },

    /**
     * Get all blog posts as array
     */
    async getAllBlogs(): Promise<Blog[]> {
        const data = await this.getBlogs();
        return data.items;
    },

    // ==================== MEDIA UPLOAD ====================

    /**
     * Upload media file
     */
    async uploadMedia(file: File, metadata?: {
        relatedEventId?: string;
        description?: string;
    }): Promise<{ url: string; id: string }> {
        const formData = new FormData();
        formData.append('file', file);

        if (metadata?.relatedEventId) {
            formData.append('relatedEventId', metadata.relatedEventId);
        }
        if (metadata?.description) {
            formData.append('description', metadata.description);
        }

        const response = await fetch(`${API_BASE_URL}/media/upload`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - browser will set it with boundary
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                errorData.message || 'Upload failed',
                response.status,
                errorData
            );
        }

        const jsonResponse: ApiResponse<{ url: string; id: string }> = await response.json();

        if (!jsonResponse.success) {
            throw new ApiError(jsonResponse.message || 'Upload failed');
        }

        return jsonResponse.data;
    },
};

/**
 * Type Definitions for API responses
 */

export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string; // ISO 8601 date string
    endDate: string;   // ISO 8601 date string
    location?: string;
    coverImage?: string; // The Poster URL
    status: 'draft' | 'upcoming' | 'completed' | 'cancelled';
    createdAt?: string;
    updatedAt?: string;
    registrationCount?: number;
    capacity?: number;
}

export const getImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith('http')) return url;
    // Remove /api/v1 from base url to get root (localhost:3000)
    const baseUrl = API_BASE_URL.replace('/api/v1', '');
    return `${baseUrl}${url}`;
};

export interface GalleryImage {
    id: string;
    imageUrl: string;
    relatedEventId: string; // Links image to an event
    description?: string;
    createdAt?: string;
}

export interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    author?: {
        name: string;
        avatar?: string;
    };
    category?: string;
    tags?: string[];
    customAuthorName?: string;
    customAuthorAvatar?: string;
    customAuthorCountry?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default api;
