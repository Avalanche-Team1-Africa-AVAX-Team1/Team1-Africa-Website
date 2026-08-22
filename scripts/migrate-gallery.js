/**
 * Migration Script: Hardcoded Gallery Images to Backend
 * 
 * This script migrates hardcoded gallery images from the frontend
 * to the backend API by:
 * 1. Creating a "Legacy Gallery 2024" event
 * 2. Uploading all hardcoded images to that event
 * 
 * Usage: node scripts/migrate-gallery.js
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1';

// Hardcoded gallery data from Gallery.tsx
const LEGACY_IMAGES = [
    { filename: 'south1.webp', title: 'Avalanche Africa Summit', location: 'Cape Town', date: 'March 2024', description: '300 builders from 15 countries. 12 projects demoed. 3 secured funding.' },
    { filename: 'event1-img.webp', title: 'Lagos Smart Contract Workshop', location: 'Lagos', date: 'April 2024', description: '85 developers learned Solidity. 24 contracts deployed.' },
    { filename: 'ghana1.JPG', title: 'Accra Hackathon', location: 'Accra', date: 'May 2024', description: '48 hours. 47 developers. 8 dApps shipped to mainnet.' },
    { filename: 'event2-img.webp', title: 'Nairobi DeFi Workshop', location: 'Nairobi', date: 'June 2024', description: 'First Kenyan DEX launched. 65 developers onboarded.' },
    { filename: 'south2.webp', title: 'Johannesburg Web3 Summit', location: 'Johannesburg', date: 'July 2024', description: '450 attendees. $5M fund announced. 15 partnerships formed.' },
    { filename: 'ghana2.JPG', title: 'Kumasi University Bootcamp', location: 'Kumasi', date: 'August 2024', description: '120 students trained. 3 startups formed.' },
    { filename: 'event3.webp', title: 'Abuja NFT Week', location: 'Abuja', date: 'September 2024', description: '200 participants. 8 NFT collections launched.' },
    { filename: 'south3.webp', title: 'Cape Town Subnet Workshop', location: 'Cape Town', date: 'October 2024', description: '35 senior developers. First African subnet deployed.' },
    { filename: 'event4.webp', title: 'Lagos DeFi Hackathon', location: 'Lagos', date: 'October 2024', description: '56 developers. Winner built micro-lending platform.' },
    { filename: 'south4.webp', title: 'Durban Meetup', location: 'Durban', date: 'November 2024', description: '90 members. 6 local projects showcased.' },
    { filename: 'event5.webp', title: 'Accra Developer Conference', location: 'Accra', date: 'November 2024', description: '180 engineers. 15 technical talks. 3 validator nodes launched.' },
    { filename: 'event6.webp', title: 'Nairobi Year-End Celebration', location: 'Nairobi', date: 'December 2024', description: '250 community members. 30 projects from the year.' },
    { filename: 'event7.webp', title: 'Addis Ababa Blockchain Forum', location: 'Addis Ababa', date: 'February 2024', description: 'First Ethiopian Web3 event. 140 attendees introduced to Avalanche.' },
    { filename: 'event8.webp', title: 'Kigali Innovation Workshop', location: 'Kigali', date: 'March 2024', description: 'Government representatives explored blockchain for public services.' },
    { filename: 'south5.webp', title: 'Port Elizabeth Community Gathering', location: 'Port Elizabeth', date: 'April 2024', description: 'Local developers showcased projects to investors and mentors.' },
    { filename: 'south6.webp', title: 'Pretoria Tech Meetup', location: 'Pretoria', date: 'May 2024', description: '70 developers shared insights on scaling blockchain applications.' },
    { filename: 'ghana3.JPG', title: 'Tema Port Blockchain Summit', location: 'Tema', date: 'June 2024', description: 'Exploring blockchain for logistics. 95 industry professionals attended.' },
    { filename: 'ghana4.JPG', title: 'Takoradi Developer Workshop', location: 'Takoradi', date: 'July 2024', description: '60 new developers onboarded to Avalanche ecosystem.' },
    { filename: 'south7.webp', title: 'Bloemfontein Innovation Day', location: 'Bloemfontein', date: 'August 2024', description: 'University students built 5 DeFi prototypes in one day.' },
    { filename: 'south8.webp', title: 'East London Blockchain Expo', location: 'East London', date: 'September 2024', description: 'Regional businesses explored blockchain integration. 110 attendees.' },
    { filename: 'south9.webp', title: 'Polokwane Developer Meetup', location: 'Polokwane', date: 'October 2024', description: '55 developers from northern regions connected and shared knowledge.' },
    { filename: 'south10.webp', title: 'Kimberley Mining & Blockchain', location: 'Kimberley', date: 'November 2024', description: 'Exploring blockchain for mining industry transparency.' },
    { filename: 'south11.webp', title: 'Nelspruit Tech Summit', location: 'Nelspruit', date: 'December 2024', description: '80 entrepreneurs learned about DeFi opportunities.' },
    { filename: 'south12.webp', title: 'George Coastal Tech Day', location: 'George', date: 'January 2024', description: 'Coastal developers showcased innovative blockchain solutions.' }
];

// Helper: API fetch with error handling
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const jsonResponse = await response.json();

    if (!jsonResponse.success) {
        throw new Error(`API request failed: ${jsonResponse.message}`);
    }

    return jsonResponse.data;
}

// Step 1: Create Legacy Event
async function createLegacyEvent() {
    console.log('📅 Creating "Legacy Gallery 2024" event...');

    const eventData = {
        title: 'Legacy Gallery 2024',
        description: 'A collection of memorable moments from Team1 Africa events throughout 2024. This gallery showcases the vibrant community, groundbreaking projects, and impactful gatherings that shaped the Avalanche ecosystem in Africa.',
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        location: 'Various locations across Africa',
        status: 'completed',
        coverImage: '' // Will be set to first uploaded image
    };

    try {
        const event = await apiFetch('/events', {
            method: 'POST',
            body: JSON.stringify(eventData),
        });

        console.log(`✅ Legacy event created with ID: ${event.id}`);
        return event;
    } catch (error) {
        console.error('❌ Failed to create legacy event:', error.message);
        throw error;
    }
}

// Step 2: Upload image to backend
async function uploadImage(imagePath, eventId, metadata) {
    console.log(`📤 Uploading: ${path.basename(imagePath)}...`);

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
        console.warn(`⚠️  File not found: ${imagePath} - Skipping`);
        return null;
    }

    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));
        formData.append('relatedEventId', eventId);
        formData.append('description', metadata.description || '');

        const response = await fetch(`${API_BASE_URL}/media/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Upload failed: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const jsonResponse = await response.json();

        if (!jsonResponse.success) {
            throw new Error(`Upload failed: ${jsonResponse.message}`);
        }

        console.log(`   ✅ Uploaded: ${jsonResponse.data.url}`);
        return jsonResponse.data;
    } catch (error) {
        console.error(`   ❌ Failed to upload ${path.basename(imagePath)}:`, error.message);
        return null;
    }
}

// Step 3: Main migration function
async function migrateGallery() {
    console.log('🚀 Starting Gallery Migration...\n');

    try {
        // Create the legacy event
        const legacyEvent = await createLegacyEvent();
        console.log('');

        // Get the assets directory path
        const assetsDir = path.join(__dirname, '..', 'src', 'assets');

        console.log(`📂 Assets directory: ${assetsDir}\n`);

        // Upload all images
        const uploadResults = [];
        let firstImageUrl = null;

        for (const imageData of LEGACY_IMAGES) {
            const imagePath = path.join(assetsDir, imageData.filename);

            const result = await uploadImage(imagePath, legacyEvent.id, {
                description: `${imageData.title} - ${imageData.location} (${imageData.date}): ${imageData.description}`
            });

            if (result) {
                uploadResults.push(result);
                if (!firstImageUrl) {
                    firstImageUrl = result.url;
                }
            }

            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log('');

        // Update event cover image with first uploaded image
        if (firstImageUrl) {
            console.log('🖼️  Updating event cover image...');
            try {
                await apiFetch(`/events/${legacyEvent.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ coverImage: firstImageUrl }),
                });
                console.log('✅ Cover image updated\n');
            } catch (error) {
                console.warn('⚠️  Failed to update cover image:', error.message, '\n');
            }
        }

        // Summary
        console.log('📊 Migration Summary:');
        console.log(`   Total images: ${LEGACY_IMAGES.length}`);
        console.log(`   Successfully uploaded: ${uploadResults.length}`);
        console.log(`   Failed: ${LEGACY_IMAGES.length - uploadResults.length}`);
        console.log(`   Event ID: ${legacyEvent.id}`);
        console.log('');
        console.log('✨ Migration completed!');

    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        process.exit(1);
    }
}

// Run migration
if (require.main === module) {
    migrateGallery().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { migrateGallery };
