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
            {/* Reduce vertical spacing on smaller screens; 4K baseline unchanged */}
            <div className='py-64 lt-1440:py-56 lt-1024:py-40 lt-768:py-28 lt-480:py-20'>
                <div className='relative top-[-10%] left-0 flex items-center justify-center'>
                    {/* Scale pixel ribbon down responsively on smaller screens */}
                    <img src={pixel} width={2000} height={150} className='lt-1440:w-[1400px] lt-1024:w-[1100px] lt-768:w-[820px] lt-480:w-[640px]' />

                    <div>
                        {/* Tweak positions and size of floating images on smaller screens */}
                        <img src={builders} width={250} height={150} alt="" className="absolute bottom-[100%] left-72 lt-1440:left-56 lt-1024:left-40 lt-768:left-20 lt-480:left-10 lt-1024:w-[220px] lt-768:w-[190px] lt-480:w-[160px]" />
                        <img src={community} width={250} height={150} alt="" className="absolute bottom-[100%] right-72 lt-1440:right-56 lt-1024:right-40 lt-768:right-20 lt-480:right-10 lt-1024:w-[220px] lt-768:w-[190px] lt-480:w-[160px]" />
                    </div>
                </div>
            </div>

            {/* What we do */}
            {/* Stack sections on tablet/phone; tighten spacing */}
            <div className='flex justify-between w-full mb-12 lt-1024:flex-col lt-1024:gap-6'>
                <div className='mb-2'>
                    <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 mb-2 font-bold'>
                        What we do
                    </span>
                    <div>
                        {/* Scale headings down on smaller screens */}
                        <p className='text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-bold py-1'>Build. Create. Educate.</p>
                        <p className='text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-bold py-1'>On Avalanche. For Africa.</p>
                    </div>
                </div>

                {/* Let the right column expand full width on smaller screens */}
                <div className='w-[19%] lt-1440:w-[28%] lt-1024:w-full'>
                    <div className='text-gray-600 text-lg lt-1440:text-base lt-1024:text-[0.95rem]'>
                        <p>Our mission is to bridge the gap between innovation and opportunity by cultivating an inclusive environment where tech talent thrives, ideas grow, and impact multiplies.</p>
                    </div>
                    {/* Shrink CTA on smaller screens */}
                    <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mt-3 lt-1024:px-5 lt-1024:py-2.5 lt-768:px-4 lt-768:py-2 rounded-full font-medium transition-colors flex items-center gap-2 lt-768:gap-1.5 group cursor-pointer'>
                        Learn more
                        {/* Icon size scales down */}
                        <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden lt-768:w-4 lt-768:h-4' />
                        <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden lt-768:w-4 lt-768:h-4' />
                    </div>
                </div>
            </div>

            <div className="-ml-8" style={{ width: 'calc(100% + 4rem)' }}>
                {/* Build Section */}
            {/* Build row: reduce padding on smaller screens */}
            <div className="bg-[#F1E228] cursor-pointer px-5 py-3 lt-1024:py-2 lt-768:px-4 flex items-center hover:pb-10 transition-all duration-500 ease-in-out">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                        {/* Icon scales down responsively */}
                        <img src={rocket} alt="" width={60} height={60} className="text-black lt-1024:w-[52px] lt-768:w-[44px]" />
                        </div>
                        <div className="flex-1 flex justify-end">
                        {/* Content column widens on smaller screens */}
                        <div className="w-[35%] lt-1440:w-[42%] lt-1024:w-[60%] lt-768:w-[80%]">
                            <h2 className="text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-semibold text-black">Build</h2>
                            <p className="text-lg lt-1440:text-base lt-1024:text-[0.95rem] lt-768:text-[0.9rem] text-black py-2">
                                    We support developers and startups through grants, mentorship, and technical workshops to build impactful dApps on Avalanche.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Section */}
            <div className="bg-[#11B55A] cursor-pointer px-5 py-3 lt-1024:py-2 lt-768:px-4 flex items-center hover:pb-10 transition-all duration-500 ease-in-out">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                        <img src={gamepad} alt="" width={60} height={60} className="text-white lt-1024:w-[52px] lt-768:w-[44px]" />
                        </div>
                        <div className="flex-1 flex justify-end">
                        <div className="w-[35%] lt-1440:w-[42%] lt-1024:w-[60%] lt-768:w-[80%]">
                            <h2 className="text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-semibold text-white">Create</h2>
                            <p className="text-lg lt-1440:text-base lt-1024:text-[0.95rem] lt-768:text-[0.9rem] text-white py-2">We empower African artists, designers, and storytellers to express their creativity using Avalanche-powered NFTs and platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educate Section */}
            <div className="bg-[#2996F3] cursor-pointe px-5 py-3 lt-1024:py-2 lt-768:px-4 flex items-center hover:pb-10 transition-all duration-500 ease-in-out">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                        <img src={scroll} alt="" width={60} height={60} className="text-white lt-1024:w-[52px] lt-768:w-[44px]" />
                        </div>
                        <div className="flex-1 flex justify-end">
                        <div className="w-[35%] lt-1440:w-[42%] lt-1024:w-[60%] lt-768:w-[80%]">
                            <h2 className="text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl font-semibold">Educate</h2>
                            <p className="text-lg lt-1440:text-base lt-1024:text-[0.95rem] lt-768:text-[0.9rem] py-2">
                            Through training, university outreach, and online content, we bring
                                    Avalanche literacy to schools, hubs, and grassroots communities.
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