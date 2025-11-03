import rocket from '../assets/rocket.svg'
import gamepad from '../assets/gamepad.svg'
import scroll from '../assets/scroll.svg'
import builders from '../assets/builders.png'
import community from '../assets/communitybanner.png'
import pixel from '../assets/pixel-avax.png'
import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'



const Build = () => {
    return (
        <div>
            <div className='py-32 lt-1440:py-24 lt-1024:py-16 lt-768:py-12'>
                <div className='relative top-[-10%] left-0 flex items-center justify-center'>
                    <img src={pixel} width={2000} height={150} className='w-full h-auto max-w-[2000px]' />

                    <div className='lt-1024:hidden'>
                        <img src={builders} width={250} height={150} alt="" className="absolute bottom-[100%] left-72 lt-1440:left-40 lt-1440:w-48" loading="lazy" />
                        <img src={community} width={250} height={150} alt="" className="absolute bottom-[100%] right-72 lt-1440:right-40 lt-1440:w-48" loading="lazy" />
                    </div>
                </div>
            </div>

            {/* What we do */}
            <div className='flex flex-col lt-1024:flex-col md:flex-row justify-between w-full mb-12 lt-1024:mb-10 gap-8 lt-1024:gap-8 px-8 lt-1024:px-5 lt-768:px-4'>
                <div className='mb-2 lt-1024:mb-6 w-full md:w-auto'>
                    <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 mb-4 lt-1024:mb-6 font-bold'>
                        What we do
                    </span>
                    <div className='mt-2 lt-1024:mt-4'>
                        <p className='text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-[1.375rem] font-bold py-1 lt-1024:py-1.5 leading-tight'>Build. Create. Educate.</p>
                        <p className='text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-[1.375rem] font-bold py-1 lt-1024:py-1.5 leading-tight'>On Avalanche. For Africa.</p>
                    </div>
                </div>

                <div className='w-full md:w-[45%] '>
                    <div className='text-gray-600 text-lg lt-1024:text-base lt-768:text-[0.9375rem] leading-relaxed'>
                        <p className='mb-6 lt-1024:mb-5'>Our mission is to bridge the gap between innovation and opportunity by cultivating an inclusive environment where tech talent thrives, ideas grow, and impact multiplies.</p>
                    </div>
                    <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 lt-768:px-5 lt-768:py-2.5 rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer'>
                        Learn more
                        <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden lt-768:w-4 lt-768:h-4' />
                        <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden lt-768:w-4 lt-768:h-4' />
                    </div>
                </div>
            </div>

            <div className="-ml-8 lt-1024:ml-0 w-[calc(100%+4rem)] lt-1024:w-full px-8">
                {/* Build Section */}
                <div className="bg-[#F1E228] cursor-pointer px-5 py-6 lt-1024:px-4 lt-1024:py-5 flex items-center hover:pb-10 lt-1024:hover:pb-8 transition-all duration-500 ease-in-out">
                    <div className="flex flex-col lt-1024:flex-col md:flex-row justify-between items-start lt-1024:items-start md:items-center w-full gap-4 lt-1024:gap-3">
                        <div className="flex-shrink-0">
                            <img src={rocket} alt="" width={60} height={60} className="text-black lt-1024:w-12 lt-1024:h-12 lt-768:w-10 lt-768:h-10" loading="lazy" />
                        </div>
                        <div className="flex-1 flex lt-1024:flex-col md:justify-end w-full">
                            <div className="w-full md:w-[35%] lt-1440:w-[45%] lt-1024:w-full">
                                <h2 className="text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-semibold text-black">Build</h2>
                                <p className="text-lg lt-1024:text-base lt-768:text-sm text-black font-semibold py-2">
                                    We support developers and startups through grants, mentorship, and technical workshops to build impactful dApps on Avalanche.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Section */}
                <div className="bg-[#11B55A] cursor-pointer px-5 py-6 lt-1024:px-4 lt-1024:py-5 flex items-center hover:pb-10 lt-1024:hover:pb-8 transition-all duration-500 ease-in-out">
                    <div className="flex flex-col lt-1024:flex-col md:flex-row justify-between items-start lt-1024:items-start md:items-center w-full gap-4 lt-1024:gap-3">
                        <div className="flex-shrink-0">
                            <img src={gamepad} alt="" width={60} height={60} className="text-white lt-1024:w-12 lt-1024:h-12 lt-768:w-10 lt-768:h-10" loading="lazy" />
                        </div>
                        <div className="flex-1 flex lt-1024:flex-col md:justify-end w-full">
                            <div className="w-full md:w-[35%] lt-1440:w-[45%] lt-1024:w-full">
                                <h2 className="text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-semibold text-white">Create</h2>
                                <p className="text-lg lt-1024:text-base lt-768:text-sm text-white font-semibold py-2">We empower African artists, designers, and storytellers to express their creativity using Avalanche-powered NFTs and platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educate Section */}
                <div className="bg-[#2996F3] cursor-pointer px-5 py-6 lt-1024:px-4 lt-1024:py-5 flex items-center hover:pb-10 lt-1024:hover:pb-8 transition-all duration-500 ease-in-out">
                    <div className="flex flex-col lt-1024:flex-col md:flex-row justify-between items-start lt-1024:items-start md:items-center w-full gap-4 lt-1024:gap-3">
                        <div className="flex-shrink-0">
                            <img src={scroll} alt="" width={60} height={60} className="text-white lt-1024:w-12 lt-1024:h-12 lt-768:w-10 lt-768:h-10" loading="lazy" />
                        </div>
                        <div className="flex-1 flex lt-1024:flex-col md:justify-end w-full">
                            <div className="w-full md:w-[35%] lt-1440:w-[45%] lt-1024:w-full">
                                <h2 className="text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-semibold text-white">Educate</h2>
                                <p className="text-lg lt-1024:text-md lt-768:text-sm text-black font-semibold py-2">
                                Through training, university outreach, and online content, we bring Avalanche literacy to schools, hubs, and grassroots communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Build;