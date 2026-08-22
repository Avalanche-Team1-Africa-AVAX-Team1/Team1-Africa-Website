// Team member type definition
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    region: 'Nigeria' | 'Ghana' | 'South Africa' | 'Tanzania' | 'Kenya' | 'Uganda' | 'Global';
    headshotUrl: string;
    headshotAlt: string;
    bio: string;
    location: string;
    socials: {
        platform: 'twitter' | 'linkedin' | 'github' | 'telegram';
        url: string;
        handle: string;
    }[];
    specialties: string[];
}

// Sample team data for Team1 Africa
export const team1AfricaMembers: TeamMember[] = [
    {
        id: 'tm-africa-ng-001',
        name: 'Feezy',
        role: 'Regional Lead',
        region: 'Nigeria',
        headshotUrl: new URL('../assets/testimonial1-sm.webp', import.meta.url).href,
        headshotAlt: 'Feezy, Team1 Africa Nigeria Regional Lead',
        bio: 'Blockchain advocate with 5+ years building developer communities across West Africa.',
        location: 'Lagos, Nigeria',
        socials: [
            { platform: 'twitter', url: 'https://twitter.com/feezytechboy', handle: '@feezytechboy' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/feezytechboy', handle: 'feezytechboy' },
        ],
        specialties: ['Community Building', 'Content Strategy'],
    },
    {
        id: 'tm-africa-ug-002',
        name: 'DannyYak',
        role: 'Bizdev & Partnership',
        region: 'Uganda',
        headshotUrl: new URL('../assets/DannyYak.webp', import.meta.url).href,
        headshotAlt: 'DannyYak, Bizdev & Partnership for Team1 Nigeria',
        bio: 'Strategic relationship builder connecting Web3 projects with local ecosystems.',
        location: 'Abuja, Nigeria',
        socials: [
            { platform: 'linkedin', url: '', handle: '' },
            { platform: 'twitter', url: 'https://x.com/SethDannyYak', handle: '@SethDannyYak' },
        ],
        specialties: ['Business Development', 'Ecosystem Partnerships', 'Strategic Alliances'],
    },
    {
        id: 'tm-africa-ng-002',
        name: 'Deon',
        role: 'Software Developer',
        region: 'Nigeria',
        headshotUrl: new URL('../assets/Deon-sm.webp', import.meta.url).href,
        headshotAlt: 'Deon, Software Developer for Team1 Africa Nigeria',
        bio: 'Full-stack developer passionate about Web3 education and open-source contributions.',
        location: 'Abuja, Nigeria',
        socials: [
            { platform: 'github', url: 'https://github.com/DanielEmmanuel1/', handle: 'DanielEmmanuel1' },
            { platform: 'twitter', url: 'https://x.com/Deontrm', handle: '@Deontrm' },
        ],
        specialties: ['Smart Contracts', 'Technical Workshops', 'Developer Tooling'],
    },
    {
        id: 'tm-africa-gh-001',
        name: 'Kwame Mensah',
        role: 'Regional Lead',
        region: 'Ghana',
        headshotUrl: new URL('../assets/ghana1-sm.webp', import.meta.url).href,
        headshotAlt: 'Kwame Mensah, Team1 Africa Ghana Regional Lead',
        bio: 'Educator and entrepreneur driving blockchain adoption through university programs.',
        location: 'Accra, Ghana',
        socials: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/kwame-mensah', handle: 'kwame-mensah' },
            { platform: 'twitter', url: 'https://twitter.com/kwame_web3', handle: '@kwame_web3' },
        ],
        specialties: ['Education', 'University Partnerships', 'Curriculum Development'],
    },
    {
        id: 'tm-africa-gh-002',
        name: 'Ama Boateng',
        role: 'Community Manager',
        region: 'Ghana',
        headshotUrl: new URL('../assets/ghana3.webp', import.meta.url).href,
        headshotAlt: 'Ama Boateng, Community Manager for Team1 Africa Ghana',
        bio: 'Community builder creating inclusive spaces for newcomers to learn and grow.',
        location: 'Kumasi, Ghana',
        socials: [
            { platform: 'twitter', url: 'https://twitter.com/ama_community', handle: '@ama_community' },
            { platform: 'telegram', url: 'https://t.me/ama_ghana', handle: '@ama_ghana' },
        ],
        specialties: ['Community Engagement', 'Event Planning', 'Social Media'],
    },
    {
        id: 'tm-africa-za-001',
        name: 'Thabo Nkosi',
        role: 'Regional Lead',
        region: 'South Africa',
        headshotUrl: new URL('../assets/south5-sm.webp', import.meta.url).href,
        headshotAlt: 'Thabo Nkosi, Team1 Africa South Africa Regional Lead',
        bio: 'Fintech veteran bridging traditional finance with DeFi innovation.',
        location: 'Cape Town, South Africa',
        socials: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/thabo-nkosi', handle: 'thabo-nkosi' },
            { platform: 'twitter', url: 'https://twitter.com/thabo_defi', handle: '@thabo_defi' },
        ],
        specialties: ['DeFi', 'Enterprise Partnerships', 'Regulatory Strategy'],
    },
    {
        id: 'tm-africa-za-002',
        name: 'Zainab Abrahams',
        role: 'Content Creator',
        region: 'South Africa',
        headshotUrl: new URL('../assets/south8-sm.webp', import.meta.url).href,
        headshotAlt: 'Zainab Abrahams, Content Creator for Team1 Africa South Africa',
        bio: 'Storyteller making complex blockchain concepts accessible through engaging content.',
        location: 'Johannesburg, South Africa',
        socials: [
            { platform: 'twitter', url: 'https://twitter.com/zainab_creates', handle: '@zainab_creates' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/zainab-abrahams', handle: 'zainab-abrahams' },
        ],
        specialties: ['Video Production', 'Educational Content', 'Brand Storytelling'],
    },
    {
        id: 'tm-africa-tz-001',
        name: 'Faraji Mwamburi',
        role: 'Regional Lead',
        region: 'Tanzania',
        headshotUrl: new URL('../assets/testimonial5-sm.webp', import.meta.url).href,
        headshotAlt: 'Faraji Mwamburi, Team1 Africa Tanzania Regional Lead',
        bio: 'Mobile payments expert building blockchain solutions for financial inclusion.',
        location: 'Dar es Salaam, Tanzania',
        socials: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/faraji-mwamburi', handle: 'faraji-mwamburi' },
            { platform: 'twitter', url: 'https://twitter.com/faraji_mobile', handle: '@faraji_mobile' },
        ],
        specialties: ['Mobile Money', 'Financial Inclusion', 'Product Strategy'],
    },
    {
        id: 'tm-africa-ke-001',
        name: 'Wanjiku Kimani',
        role: 'Regional Lead',
        region: 'Kenya',
        headshotUrl: new URL('../assets/testimonial22-sm.webp', import.meta.url).href,
        headshotAlt: 'Wanjiku Kimani, Team1 Africa Kenya Regional Lead',
        bio: 'Product leader with deep expertise in fintech and community-driven development.',
        location: 'Nairobi, Kenya',
        socials: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/wanjiku-kimani', handle: 'wanjiku-kimani' },
            { platform: 'twitter', url: 'https://twitter.com/wanjiku_builds', handle: '@wanjiku_builds' },
        ],
        specialties: ['Product Development', 'Fintech Innovation', 'Community Growth'],
    },
    {
        id: 'tm-africa-ke-002',
        name: 'Omondi Otieno',
        role: 'Designer',
        region: 'Kenya',
        headshotUrl: new URL('../assets/testimonial7-sm.webp', import.meta.url).href,
        headshotAlt: 'Omondi Otieno, Designer for Team1 Africa Kenya',
        bio: 'Creative designer crafting beautiful, user-centered experiences for Web3.',
        location: 'Mombasa, Kenya',
        socials: [
            { platform: 'twitter', url: 'https://twitter.com/omondi_design', handle: '@omondi_design' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/omondi-otieno', handle: 'omondi-otieno' },
        ],
        specialties: ['UI/UX Design', 'Brand Identity', 'Visual Design'],
    },
    {
        id: 'tm-africa-ug-001',
        name: 'Nakato Sarah',
        role: 'Regional Lead',
        region: 'Uganda',
        headshotUrl: new URL('../assets/testimonial9-sm.webp', import.meta.url).href,
        headshotAlt: 'Nakato Sarah, Team1 Africa Uganda Regional Lead',
        bio: 'Youth empowerment advocate training the next generation of African developers.',
        location: 'Kampala, Uganda',
        socials: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/nakato-sarah', handle: 'nakato-sarah' },
            { platform: 'twitter', url: 'https://twitter.com/nakato_dev', handle: '@nakato_dev' },
        ],
        specialties: ['Developer Training', 'Youth Programs', 'Social Impact'],
    },
];
