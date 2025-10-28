import rocket from '../assets/rocket.svg'
import gamepad from '../assets/gamepad.svg'
import scroll from '../assets/scroll.svg'
import builders from '../assets/builders.png'
import community from '../assets/communitybanner.png'
import pixel from '../assets/pixel-avax.svg'
import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'
import love from '../assets/love.svg'
import heart from '../assets/heart.svg'
import paperplane from '../assets/paper-plane.svg'
import { useMediaQuery } from '../hooks/useMediaQuery'



const Build = () => {
    const isTouch = useMediaQuery('(hover: none), (pointer: coarse)')
    return (
        <div>
            {/* Centered wrapper for top sections */}
            <div className=' w-full px-2 md:px-8'>
                {/* Reduce vertical spacing on smaller screens; 4K baseline unchanged */}
                <div className='py-64 lt-1440:py-56 lt-1024:py-40 lt-768:py-28 lt-480:py-20 '>
                    <div className={`relative top-[-10%] left-0 flex items-center justify-center group hover:cursor-pointer ${isTouch ? 'touch-active' : ''}`}>
                    {/* Pixel ribbon with anchored tiny icons */}
                    <div className='relative'>
                        {/* Scale pixel ribbon down; turn black on hover */}
                        <img src={pixel} width={2000} height={150} className='lt-1440:w-[1400px] lt-1024:w-[1100px] lt-768:w-[820px] lt-480:w-[400px] transition-[filter] duration-500 ease-in-out filter group-hover:brightness-0 group-hover:saturate-100 group-[.touch-active]:brightness-0 group-[.touch-active]:saturate-100' />

                        {/* Tiny icons entering from multiple sides */}
                        <img src={love} alt='' className='pointer-events-none absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-10 md:-left-10 w-5 sm:w-6 md:w-8 lg:w-10 xl:w-12 2xl:w-14 transition-all duration-700 ease-in-out opacity-0 -translate-x-3 -translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-x-0 group-[.touch-active]:translate-y-0' />
                        <img src={heart} alt='' className='pointer-events-none absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-8 w-5 sm:w-6 md:w-8 lg:w-10 xl:w-12 2xl:w-14 transition-all duration-700 ease-in-out opacity-0 translate-x-3 -translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-x-0 group-[.touch-active]:translate-y-0' />
                        <img src={paperplane} alt='' className='pointer-events-none absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-20 w-5 sm:w-6 md:w-8 lg:w-10 xl:w-12 2xl:w-14 transition-all duration-700 ease-in-out opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-x-0 group-[.touch-active]:translate-y-0' />
                        <img src={rocket} alt='' className='pointer-events-none absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 w-5 sm:w-6 md:w-8 lg:w-10 xl:w-12 2xl:w-14 transition-all duration-700 ease-in-out opacity-0 translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-x-0 group-[.touch-active]:translate-y-0' />

					{/* Builders / Community images anchored within ribbon width */}
					<img src={builders} alt='' className='pointer-events-none absolute -top-1 left-[1%] sm:-top-1 sm:left-[2%] md:-top-2 md:left-[2%] lg:-top-2 lg:left-[2%] xl:-top-40 xl:left-[5%] w-16 sm:w-20 md:w-24 lg:w-28 xl:w-48 transition-all duration-700 ease-in-out opacity-0 -translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-y-0 group-[.touch-active]:scale-100' />
					<img src={community} alt='' className='pointer-events-none absolute -top-1 right-[1%] sm:-top-1 sm:right-[2%] md:-top-2 md:right-[2%] lg:-top-2 lg:right-[2%] xl:-top-40 xl:right-[5%] w-16 sm:w-20 md:w-24 lg:w-28 xl:w-48 transition-all duration-700 ease-in-out opacity-0 -translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-y-0 group-[.touch-active]:scale-100' />

                        {/* Speech bubbles removed - images retained */}
                    </div>

				{/* Larger floating images near the ribbon - removed (now anchored above) */}

                    
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

                    {/* Narrow width positioned at the extreme right end */}
                    <div className='w-[40%] lt-1440:w-[40%] lt-1024:w-full ml-auto'>
                        <div className='text-gray-600 text-lg lt-1440:text-base lt-1024:text-[0.95rem] w-[40%] ml-auto'>
                            <p>Our mission is to bridge the gap between innovation and opportunity by cultivating an inclusive environment where tech talent thrives, ideas grow, and impact multiplies.</p>
                            {/* Shrink CTA on smaller screens */}
                            <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mt-3 lt-1024:px-5 lt-1024:py-2.5 lt-768:px-4 lt-768:py-2 rounded-full font-medium transition-colors flex items-center gap-2 lt-768:gap-1.5 group cursor-pointer'>
                                Learn more
                                {/* Icon size scales down */}
                                <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden lt-768:w-4 lt-768:h-4' />
                                <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden lt-768:w-4 lt-768:h-4' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-width colored sections */}
            <div className="w-full">
                {/* Build Section */}
                {/* Build row: reduce padding on smaller screens */}
                <div className="bg-[#F1E228] cursor-pointer px-5 py-3 lt-1024:py-2 lt-768:px-4 flex items-center hover:pb-10 transition-all duration-500 ease-in-out group">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                        {/* Icon scales down responsively; add subtle motion on hover */}
                        <img src={rocket} alt="" width={60} height={60} className="text-black lt-1024:w-[52px] lt-768:w-[44px] transition-transform duration-500 ease-in-out group-hover:-translate-y-1 group-hover:rotate-3" />
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
                <div className="bg-[#11B55A] cursor-pointer px-5 py-3 lt-1024:py-2 lt-768:px-4 flex items-center hover:pb-10 transition-all duration-500 ease-in-out group">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                        <img src={gamepad} alt="" width={60} height={60} className="text-white lt-1024:w-[52px] lt-768:w-[44px] transition-transform duration-500 ease-in-out group-hover:-translate-y-1 group-hover:-rotate-3" />
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
                <div className="bg-[#2996F3] cursor-pointe px-5 py-3 lt-1024:py-2 lt-768:px-4 flex items-center hover:pb-10 transition-all duration-500 ease-in-out group">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                        <img src={scroll} alt="" width={60} height={60} className="text-white lt-1024:w-[52px] lt-768:w-[44px] transition-transform duration-500 ease-in-out group-hover:-translate-y-1" />
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