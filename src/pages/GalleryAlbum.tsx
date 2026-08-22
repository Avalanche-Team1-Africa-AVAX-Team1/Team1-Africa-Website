import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';


// Import all images
import event1 from '../assets/event1-img.webp';
import event2 from '../assets/event2-img.webp';
import event3 from '../assets/event3.webp';
import event4 from '../assets/event4.webp';
import event5 from '../assets/event5.webp';
import event6 from '../assets/event6.webp';
import event7 from '../assets/event7.webp';
import event8 from '../assets/event8.webp';
import south1 from '../assets/south1.webp';
import south2 from '../assets/south2.webp';
import south3 from '../assets/south3.webp';
import south4 from '../assets/south4.webp';
import south5 from '../assets/south5.webp';
import ghana1 from '../assets/ghana1.webp';
import ghana2 from '../assets/ghana2.webp';
import ghana3 from '../assets/ghana3.webp';
import ghana4 from '../assets/ghana4.webp';

// Album data
const albums = {
    'avalanche-africa-summit': {
        title: 'AVALANCHE AFRICA SUMMIT',
        description: 'We brought together 300+ builders from 15 African countries for the largest Avalanche gathering on the continent. Projects pitched, partnerships formed, and the future of blockchain in Africa was shaped.',
        location: 'Cape Town, South Africa',
        date: 'March 2024',
        images: [south1, event1, ghana1, south2, event2, south3, event3, south4, event4, south5, event5, ghana2]
    },
    'accra-hackathon': {
        title: 'ACCRA HACKATHON',
        description: '48 intense hours of innovation in Ghana\'s tech capital. 47 developers built 8 production-ready dApps that shipped to mainnet. The energy was unmatched.',
        location: 'Accra, Ghana',
        date: 'May 2024',
        images: [event2, south3, ghana2, event3, ghana1, event4, south1, ghana3, south2, event5, ghana4, south4]
    },
    'nairobi-defi-workshop': {
        title: 'NAIROBI DEFI WORKSHOP',
        description: 'Kenya\'s first decentralized exchange was born here. 65 developers learned DeFi fundamentals and the community gained new validators for the ecosystem.',
        location: 'Nairobi, Kenya',
        date: 'June 2024',
        images: [event4, south4, event5, ghana3, event1, south2, ghana1, event6, south3, event2, ghana2, event7]
    },
    'cape-town-subnet-workshop': {
        title: 'CAPE TOWN SUBNET WORKSHOP',
        description: 'Senior developers dove deep into Avalanche subnet architecture. By the end, we had deployed Africa\'s first custom subnet - a milestone moment.',
        location: 'Cape Town, South Africa',
        date: 'October 2024',
        images: [event6, south5, ghana4, event7, south1, event8, south2, ghana1, south3, event1, ghana2, south4]
    },
    'lagos-blockchain-summit': {
        title: 'LAGOS BLOCKCHAIN SUMMIT',
        description: 'Nigeria\'s tech capital hosted the biggest blockchain gathering in West Africa with over 500 participants and groundbreaking partnerships.',
        location: 'Lagos, Nigeria',
        date: 'November 2024',
        images: [event8, event1, south1, ghana1, event2, south2, ghana2, event3, south3, ghana3, event4, south4]
    }
};

export default function GalleryAlbum() {
    const { albumId } = useParams<{ albumId: string }>();
    const album = albumId ? albums[albumId as keyof typeof albums] : null;

    if (!album) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Album Not Found</h1>
                    <Link to="/gallery" className="text-red-500 font-semibold hover:underline">
                        ← Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <Link
                    to="/gallery"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 font-semibold mb-8 transition-colors duration-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Gallery
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-4">
                        {album.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {album.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {album.date}
                        </span>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                        {album.description}
                    </p>
                </motion.div>
            </div>

            {/* Photo Grid */}
            <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {album.images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"
                        >
                            <img
                                src={image}
                                alt={`${album.title} - Photo ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer */}

        </div>
    );
}
