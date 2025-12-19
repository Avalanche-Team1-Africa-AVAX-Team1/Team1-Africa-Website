import team1logo from '../assets/team1logo.png'
import avacloud from '../assets/avacloud.png'
import arena from '../assets/arena_logo.png'
import maplestory from '../assets/maplestory.png'
import blaze from '../assets/blaze_logo.png'
import core from '../assets/core.webp'
import salvor from '../assets/salvor.png'
import ket from '../assets/ket 2.png'
import AnimatedText from './AnimatedText'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'

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
                    <p className='text-2xl md:text-4xl lg:text-6xl font-semibold leading-tight tracking-tighter'>Our ecosystem <span className='text-red-500'>partners</span> accelerate what's possible. Together, we're building Africa's <span className='text-red-500'>blockchain infrastructure</span>—from education to <span className='text-red-500'>funding opportunities</span>.</p>
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
                <AnimatedSection staggerChildren={0.1} delay={0.4}>
                    <div className='grid grid-cols-1 md:grid-cols-4 border-dashed border-gray-300'>
                        {/* Row 1 */}
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-red-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-red-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-red-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-red-600 md:group-hover:font-semibold'>Team1</p>
                                <img src={team1logo} alt="Team1" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-blue-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-blue-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-blue-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-blue-600 md:group-hover:font-semibold'>AvaCloud</p>
                                <img src={avacloud} alt="AvaCloud" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-orange-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-orange-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-orange-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-orange-600 md:group-hover:font-semibold'>The Arena</p>
                                <img src={arena} alt="The Arena" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 cursor-pointer transition-all duration-300 bg-green-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-green-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-green-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-green-600 md:group-hover:font-semibold'>Maplestory</p>
                                <img src={maplestory} alt="Maplestory" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>

                        {/* Horizontal dashed line between rows */}
                        <div className='col-span-1 md:col-span-4 border-t-2 border-dashed border-gray-300 hidden md:block'></div>

                        {/* Row 2 */}
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-yellow-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-yellow-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-yellow-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-yellow-600 md:group-hover:font-semibold'>Blaze</p>
                                <img src={blaze} alt="Blaze" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-indigo-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-indigo-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-indigo-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-indigo-600 md:group-hover:font-semibold'>Core App</p>
                                <img src={core} alt="Core App" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 bg-purple-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-purple-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-purple-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-purple-600 md:group-hover:font-semibold'>Salvor</p>
                                <img src={salvor} alt="Salvor" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                        <AnimatedItem>
                            <div className='flex flex-col items-center py-8 px-4 md:py-12 md:px-8 cursor-pointer transition-all duration-300 bg-teal-50 shadow-lg md:bg-transparent md:shadow-none md:hover:bg-teal-50 md:hover:shadow-lg group h-full w-full'>
                                <p className='text-sm text-center transition-colors duration-300 text-teal-600 font-semibold md:text-gray-600 md:font-normal md:group-hover:text-teal-600 md:group-hover:font-semibold'>Ket</p>
                                <img src={ket} alt="Ket" loading="lazy" className='w-40 md:w-56 h-20 md:h-24 object-contain mb-4 transition-transform duration-300 scale-110 md:scale-100 md:group-hover:scale-110' />
                            </div>
                        </AnimatedItem>
                    </div>
                </AnimatedSection>

                {/* Bottom border - dashed line */}
                <div className='w-full border-dashed border-gray-300 mt-0'></div>
            </div>
        </div>
    );
}

export default Partners;