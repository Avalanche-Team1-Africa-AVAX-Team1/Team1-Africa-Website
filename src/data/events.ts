import type { Event } from '../types/event';

// Team1 Africa themed events - November 2024
export const mockEvents: Event[] = [
  // November 2024 events
  {
    date: '2024-11-05',
    title: 'Avalanche Blockchain Fundamentals',
    description: 'Learn the basics of Avalanche blockchain, consensus mechanisms, and network architecture. Perfect for beginners who want to understand how blockchain technology works.',
    time: '9:00 AM - 10:00 AM',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Lagos, Nigeria',
    room: 'SMALL ROOM #1',
    capacity: 20,
    currentAttendees: 15,
    color: '#fef3c7', // light yellow
    imageHeader: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    organizer: {
      name: 'Amelia Rhodes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia'
    },
    attendees: []
  },
  {
    date: '2024-11-05',
    title: 'Smart Contract Development Workshop',
    description: 'Hands-on workshop on building and deploying smart contracts on Avalanche. Bring your laptop and get ready to code!',
    time: '10:00 AM - 12:00 PM',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Lagos, Nigeria',
    room: 'HALL ROOM',
    capacity: 30,
    currentAttendees: 20,
    color: '#fce7f3', // light pink
    imageHeader: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
    organizer: {
      name: 'Aarav Brahman',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav'
    },
    attendees: []
  },
  {
    date: '2024-11-05',
    title: 'DeFi Protocols on Avalanche',
    description: 'Explore popular DeFi protocols, yield farming, and liquidity provision strategies on Avalanche network.',
    time: '2:00 PM - 4:00 PM',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Lagos, Nigeria',
    room: 'SMALL ROOM #2',
    capacity: 20,
    currentAttendees: 18,
    color: '#dbeafe', // light blue
    imageHeader: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&h=400&fit=crop',
    organizer: {
      name: 'Amelia Rhodes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia'
    },
    attendees: []
  },
  {
    date: '2024-11-08',
    title: 'Web3 Development Bootcamp',
    description: 'Intensive bootcamp covering frontend integration, wallet connections, and dApp development on Avalanche.',
    time: '9:00 AM - 5:00 PM',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Nairobi, Kenya',
    room: 'HALL ROOM',
    capacity: 50,
    currentAttendees: 35,
    color: '#e0e7ff', // light indigo
    imageHeader: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
    organizer: {
      name: 'Kathleen Price',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kathleen'
    },
    attendees: []
  },
  {
    date: '2024-11-12',
    title: 'NFT Marketplace Development',
    description: 'Build your own NFT marketplace on Avalanche. Learn about IPFS, metadata standards, and royalty systems.',
    time: '10:00 AM - 12:00 PM',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Accra, Ghana',
    room: 'SMALL ROOM #3',
    capacity: 20,
    currentAttendees: 15,
    color: '#ccfbf1', // light teal
    imageHeader: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=400&fit=crop',
    organizer: {
      name: 'Kathleen Price',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kathleen'
    },
    attendees: []
  },
  {
    date: '2024-11-12',
    title: 'Avalanche Subnets Deep Dive',
    description: 'Advanced session on creating and managing custom subnets on Avalanche. For experienced developers.',
    time: '2:00 PM - 4:00 PM',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Accra, Ghana',
    room: 'SMALL ROOM #4',
    capacity: 20,
    currentAttendees: 8,
    color: '#f3e8ff', // light violet
    imageHeader: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    organizer: {
      name: 'Aarav Brahman',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav'
    },
    attendees: []
  },
  {
    date: '2024-11-15',
    title: 'Cross-Chain Bridge Technologies',
    description: 'Understanding cross-chain bridges, asset transfers, and interoperability solutions on Avalanche.',
    time: '11:00 AM - 1:00 PM',
    startTime: '11:00',
    endTime: '13:00',
    location: 'Cape Town, South Africa',
    room: 'SMALL ROOM #1',
    capacity: 20,
    currentAttendees: 12,
    color: '#fed7aa', // light orange
    imageHeader: 'https://images.unsplash.com/photo-1639322537221-f02ce1e869e1?w=800&h=400&fit=crop',
    organizer: {
      name: 'Amelia Rhodes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia'
    },
    attendees: []
  },
  {
    date: '2024-11-15',
    title: 'Avalanche Validator Setup',
    description: 'Learn how to set up and run an Avalanche validator node. Network security and staking rewards explained.',
    time: '3:00 PM - 5:00 PM',
    startTime: '15:00',
    endTime: '17:00',
    location: 'Cape Town, South Africa',
    room: 'SMALL ROOM #2',
    capacity: 20,
    currentAttendees: 18,
    color: '#cffafe', // light cyan
    imageHeader: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    organizer: {
      name: 'Aarav Brahman',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav'
    },
    attendees: []
  },
  {
    date: '2024-11-18',
    title: 'GameFi on Avalanche',
    description: 'Building blockchain games and integrating NFTs. Explore play-to-earn models and in-game economies.',
    time: '10:00 AM - 12:00 PM',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Lagos, Nigeria',
    room: 'SMALL ROOM #1',
    capacity: 20,
    currentAttendees: 13,
    color: '#fef2f2', // light rose
    imageHeader: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=400&fit=crop',
    organizer: {
      name: 'Kathleen Price',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kathleen'
    },
    attendees: []
  },
  {
    date: '2024-11-18',
    title: 'Avalanche Ecosystem Networking',
    description: 'Network with builders, developers, and entrepreneurs in the Avalanche ecosystem. Open discussion and Q&A session.',
    time: '2:30 PM - 4:30 PM',
    startTime: '14:30',
    endTime: '16:30',
    location: 'Lagos, Nigeria',
    room: 'HALL ROOM',
    capacity: 30,
    currentAttendees: 26,
    color: '#e0f2fe', // light sky blue
    imageHeader: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    organizer: {
      name: 'Amelia Rhodes',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia'
    },
    attendees: []
  },
  {
    date: '2024-11-22',
    title: 'Avalanche Ecosystem Meetup',
    description: 'Join us for an exciting meetup where we explore the latest developments in the Avalanche ecosystem. Network with builders, developers, and enthusiasts.',
    time: '6:00 PM - 9:00 PM',
    startTime: '18:00',
    endTime: '21:00',
    location: 'Lagos, Nigeria',
    room: 'HALL ROOM',
    capacity: 30,
    currentAttendees: 26,
    color: '#f5d0fe', // light fuchsia
    imageHeader: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    organizer: {
      name: 'Team1 Africa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team1'
    },
    attendees: [
      { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
      { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
      { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    ]
  },
  {
    date: '2024-11-25',
    title: 'DeFi Deep Dive',
    description: 'Explore advanced DeFi concepts, yield farming strategies, and liquidity provision on Avalanche. Expert speakers and Q&A session.',
    time: '2:00 PM - 6:00 PM',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Accra, Ghana',
    room: 'SMALL ROOM #3',
    capacity: 20,
    currentAttendees: 8,
    color: '#dcfce7', // light green
    imageHeader: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&h=400&fit=crop',
    organizer: {
      name: 'Aarav Brahman',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav'
    },
    attendees: [
      { name: 'James Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
      { name: 'Olivia White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia' },
    ]
  },
  {
    date: '2024-11-28',
    title: 'NFT Art Gallery Opening',
    description: 'Celebrate African digital art with an exclusive NFT gallery opening. Meet artists, collectors, and explore the future of digital ownership.',
    time: '7:00 PM - 11:00 PM',
    startTime: '19:00',
    endTime: '23:00',
    location: 'Lagos, Nigeria',
    room: 'SMALL ROOM #1',
    capacity: 20,
    currentAttendees: 15,
    color: '#fef3c7', // light yellow
    imageHeader: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
    organizer: {
      name: 'Kathleen Price',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kathleen'
    },
    attendees: [
      { name: 'Noah Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah' },
      { name: 'Sophia Harris', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia' },
    ]
  },
];

// Helper function to get events for a specific date
export const getEventForDate = (date: Date): Event | undefined => {
  const dateStr = date.toISOString().split('T')[0];
  return mockEvents.find(event => event.date === dateStr);
};

// Helper function to get all events for a specific date
export const getEventsForDate = (date: Date): Event[] => {
  const dateStr = date.toISOString().split('T')[0];
  return mockEvents.filter(event => event.date === dateStr);
};

// Helper function to get all events
export const getAllEvents = (): Event[] => {
  return mockEvents;
};
