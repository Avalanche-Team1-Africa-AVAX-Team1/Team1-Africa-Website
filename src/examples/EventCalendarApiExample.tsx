/**
 * Example: Refactored EventCalendar Component
 * 
 * This shows how to integrate the EventCalendar with the API
 * instead of using hardcoded data from src/data/events.ts
 */

import { useState, useEffect } from 'react';
import { api, type Event as ApiEvent } from '../lib/api';

// Helper function to convert API events to calendar format
function convertApiEventToCalendarEvent(apiEvent: ApiEvent) {
    const startDate = new Date(apiEvent.startDate);
    const endDate = new Date(apiEvent.endDate);

    // Format time strings
    const startTime = startDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const endTime = endDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const displayTime = `${startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })} - ${endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })}`;

    return {
        date: startDate.toISOString().split('T')[0], // YYYY-MM-DD
        title: apiEvent.title,
        description: apiEvent.description,
        time: displayTime,
        startTime: startTime,
        endTime: endTime,
        location: apiEvent.location || 'TBD',
        room: undefined, // API doesn't have room info yet
        capacity: 0, // API doesn't have capacity yet
        currentAttendees: 0, // API doesn't have attendees yet
        organizer: {
            name: 'Team1 Africa',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team1'
        },
        attendees: [],
        color: '#fef3c7', // Default color
        imageHeader: apiEvent.coverImage
    };
}

// Example usage in a component
export function EventCalendarExample() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);

                // Fetch upcoming events from API
                const upcomingEvents = await api.getUpcomingEvents();

                // Convert to calendar format
                const calendarEvents = upcomingEvents.map(convertApiEventToCalendarEvent);

                setEvents(calendarEvents);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setError(err instanceof Error ? err.message : 'Failed to load events');
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="grid gap-4">
                {events.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            <p>📅 {event.date}</p>
                            <p>🕐 {event.time}</p>
                            <p>📍 {event.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * To integrate this into your existing EventCalendar component:
 * 
 * 1. Import the api client:
 *    import { api } from '../lib/api';
 * 
 * 2. Replace the import from '../data/events' with API calls
 * 
 * 3. Add loading and error states
 * 
 * 4. Use the convertApiEventToCalendarEvent helper to transform data
 * 
 * 5. Update the component to use the fetched events instead of mockEvents
 */

export default EventCalendarExample;
