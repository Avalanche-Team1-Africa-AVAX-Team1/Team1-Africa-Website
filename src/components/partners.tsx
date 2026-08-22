import team1logo from '../assets/team1logo.png'
import avacloud from '../assets/avacloud.webp'
import arena from '../assets/arena_logo.webp'
import maplestory from '../assets/maplestory.png'
import blaze from '../assets/blaze_logo.webp'
import core from '../assets/core.webp'
import salvor from '../assets/salvor.webp'
import ket from '../assets/ket 2.webp'
import AnimatedText from './AnimatedText'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'

const partners = [
    {
        name: 'Team1',
        logo: team1logo,
        link: 'https://x.com/AvaxTeam1',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
        hoverBg: 'md:hover:bg-red-50',
        hoverText: 'md:group-hover:text-red-600'
    },
    {
        name: 'AvaCloud',
        logo: avacloud,
        link: 'https://avacloud.io/',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        hoverBg: 'md:hover:bg-blue-50',
        hoverText: 'md:group-hover:text-blue-600'
    },
    {
        name: 'The Arena',
        logo: arena,
        link: 'https://arena.social/',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
        hoverBg: 'md:hover:bg-orange-50',
        hoverText: 'md:group-hover:text-orange-600'
    },
    {
        name: 'MapleStory Universe',
        logo: maplestory,
        link: 'https://msu.io/',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        hoverBg: 'md:hover:bg-green-50',
        hoverText: 'md:group-hover:text-green-600'
    },
    {
        name: 'Blaze',
        logo: blaze,
        link: 'https://blaze.stream/',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-600',
        hoverBg: 'md:hover:bg-yellow-50',
        hoverText: 'md:group-hover:text-yellow-600'
    },
    {
        name: 'Core App',
        logo: core,
        link: 'https://core.app/',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-600',
        hoverBg: 'md:hover:bg-indigo-50',
        hoverText: 'md:group-hover:text-indigo-600'
    },
    {
        name: 'Salvor',
        logo: salvor,
        link: 'https://salvor.io/',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
        hoverBg: 'md:hover:bg-purple-50',
        hoverText: 'md:group-hover:text-purple-600'
    },
    {
        name: 'Ket',
        logo: ket,
        link: 'https://www.ketorbs.xyz/',
        bgColor: 'bg-teal-50',
        textColor: 'text-teal-600',
        hoverBg: 'md:hover:bg-teal-50',
        hoverText: 'md:group-hover:text-teal-600'
    }
]

const Partners = () => {
    return (
        <div className='px-4 py-16 flex flex-col lg:items-center justify-center'>
            {/* PartnersBadge */}
            <AnimatedText variant="scale" delay={0.1}>
                <div className='mb-2'>
                    <span className='bg-red-500 text-white px-4 py-2 rounded-lg text-sm inline-block transform md:-rotate-12 font-bold'>
                        Our Partners
                    </span>
                </div>
            </AnimatedText>

            <div className='text-left lg:text-center mb-16'>
                <AnimatedText variant="slideUp" delay={0.2}>
                    <p className='text-2xl md:text-4xl lg:text-6xl font-semibold leading-tight tracking-tighter'>Our ecosystem <span className='text-red-500'>partners</span> accelerate what's possible. Together, we're building Africa's <span className='text-red-500'>blockchain infrastructure</span>, from education to <span className='text-red-500'>funding opportunities</span>.</p>
                </AnimatedText>
                <AnimatedText variant="slideUp" delay={0.3}>
                    <p className='text-sm md:text-sm text-gray-600 pt-1 md:pt-4'>We proudly collaborate with organizations that believe in Africa's potential.</p>
                </AnimatedText>
            </div>

            {/* Dotted Table Structure */}
            <div className='w-full'>
                {/* Top border - dotted line */}
                <div className='w-full border-dashed border-gray-300 mb-0'></div>

                {/* Table content - responsive */}
                {/* Table content - responsive */}
                <AnimatedSection staggerChildren={0.1} delay={0.4}>
                    <div className='grid grid-cols-1 md:grid-cols-4 border-dashed border-gray-300 border-l-2 border-r-2 md:border-l-0 md:border-r-0'>
                        {/* Row 1 */}
                        {partners.slice(0, 4).map((partner, index) => (
                            <AnimatedItem key={partner.name}>
                                <a
                                    href={partner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center py-8 px-4 md:py-12 md:px-8 ${index < 3 ? 'border-b-2 md:border-b-0 md:border-r-2' : 'border-b-2 md:border-b-0'} border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-transparent shadow-none md:bg-transparent md:shadow-none ${partner.hoverBg} md:hover:shadow-lg group h-full w-full`}
                                >
                                    <p className={`text-sm text-center transition-colors duration-300 ${partner.textColor} font-semibold md:text-gray-600 md:font-normal ${partner.hoverText} md:group-hover:font-semibold`}>{partner.name}</p>
                                    <img src={partner.logo} alt={partner.name} loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                                </a>
                            </AnimatedItem>
                        ))}

                        {/* Horizontal dashed line between rows - visible on ALL screens now, but effectively hidden by border collapse logic or layout on mobile if not careful. 
                            Actually, on mobile this div takes up a slot. The user wanted a line. 
                            If I add border-b-2 to the 4th item (index 3), that creates the line.
                            In my code above, I changed the condition to: index < 3 ? ... : 'border-b-2 md:border-b-0'.
                            This ensures the 4th item (index 3) gets a bottom border on mobile.
                            Then we don't strictly *need* the separator div on mobile if the item itself has the border.
                            Using the separator div on mobile might create a double border or an empty row which looks wide.
                            I will keep the separator HIDDEN on mobile, and instead apply the border-b-2 to the LAST item of the first row (MapleStory) specifically on mobile.
                        */}
                        <div className='col-span-1 md:col-span-4 border-t-2 border-dashed border-gray-300 hidden md:block'></div>

                        {/* Row 2 */}
                        {partners.slice(4, 8).map((partner, index) => (
                            <AnimatedItem key={partner.name}>
                                <a
                                    href={partner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center py-8 px-4 md:py-12 md:px-8 ${index < 3 ? 'border-b-2 md:border-b-0 md:border-r-2' : ''} border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-transparent shadow-none md:bg-transparent md:shadow-none ${partner.hoverBg} md:hover:shadow-lg group h-full w-full`}
                                >
                                    <p className={`text-sm text-center transition-colors duration-300 ${partner.textColor} font-semibold md:text-gray-600 md:font-normal ${partner.hoverText} md:group-hover:font-semibold`}>{partner.name}</p>
                                    <img src={partner.logo} alt={partner.name} loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                                </a>
                            </AnimatedItem>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Bottom border - dashed line */}
                <div className='w-full border-dashed border-gray-300 mt-0'></div>
            </div>
        </div>
    );
}

export default Partners;