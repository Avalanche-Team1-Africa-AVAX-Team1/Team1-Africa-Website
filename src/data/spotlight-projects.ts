export interface SpotlightProject {
    id: number;
    name: string;
    tagline: string;
    description: string;
    impact: string;
    builder: string;
    location: string;
    metric: string;
    category: 'DeFi' | 'Gaming' | 'NFT' | 'DAO' | 'Infrastructure' | 'Social';
    color: string;
    textColor: string;
}

export const spotlightProjects: SpotlightProject[] = [
    {
        id: 1,
        name: 'AfriPay',
        tagline: 'Instant cross-border payments',
        description: 'Real-time settlement network enabling African merchants to accept payments across borders with sub-second finality',
        impact: 'Avalanche consensus ensures instant payment confirmation. Low fees make micro-payments viable.',
        builder: 'Lagos-based fintech team',
        location: 'Nigeria',
        metric: '$2.4M monthly volume',
        category: 'DeFi',
        color: '#fc3030',
        textColor: 'text-white'
    },
    {
        id: 2,
        name: 'Harvest Protocol',
        tagline: 'Farm-to-market transparency',
        description: 'Blockchain tracking for agricultural products ensuring fair prices for 1,200+ smallholder farmers',
        impact: 'Low transaction costs enable tracking individual farm batches. Subnets provide enterprise privacy.',
        builder: 'AgTech entrepreneur',
        location: 'Kenya',
        metric: '45K+ products tracked',
        category: 'Infrastructure',
        color: '#0d8033',
        textColor: 'text-white'
    },
    {
        id: 3,
        name: 'Sankofa NFT',
        tagline: 'Cultural heritage on-chain',
        description: 'Community-owned NFT marketplace where 240 African artists mint and trade cultural NFTs with perpetual royalties',
        impact: 'Affordable minting enables grassroots creators. Fast finality improves trading experience.',
        builder: 'Artist collective',
        location: 'Ghana',
        metric: '$680K total sales',
        category: 'NFT',
        color: '#2996F3',
        textColor: 'text-white'
    },
    {
        id: 4,
        name: 'Jamii DAO',
        tagline: 'Community-governed impact',
        description: 'Decentralized organization funding 67 social impact projects through transparent community voting',
        impact: 'Fast consensus enables rapid voting and fund distribution for time-sensitive community needs.',
        builder: 'Distributed impact team',
        location: 'Ethiopia',
        metric: '$420K treasury',
        category: 'DAO',
        color: '#0e6bd6',
        textColor: 'text-white'
    },
    {
        id: 5,
        name: 'Adumu Games',
        tagline: 'African mythology meets GameFi',
        description: 'Play-to-earn game based on African folklore with 8,500 beta players earning through skill-based gameplay',
        impact: 'High throughput supports real-time gameplay. Subnets enable game-specific optimizations.',
        builder: 'Game studio',
        location: 'South Africa',
        metric: '12K NFTs minted',
        category: 'Gaming',
        color: '#11B55A',
        textColor: 'text-white'
    },
    {
        id: 6,
        name: 'Ubuntu Identity',
        tagline: 'Self-sovereign identity',
        description: 'Decentralized identity system enabling 92K unbanked Africans to access financial and government services',
        impact: 'Instant finality ensures identity credentials are immediately verifiable by service providers.',
        builder: 'Identity tech company',
        location: 'Rwanda',
        metric: '5 countries, 18 partners',
        category: 'Infrastructure',
        color: '#E91E63',
        textColor: 'text-white'
    }
];
