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
            <div className='py-64'>
                <div className='relative top-[-10%] left-0 flex items-center justify-center'>
                    <img src={pixel} width={2000} height={150} />

                    <div>
                        <img src={builders} width={250} height={150} alt="" className="absolute bottom-[100%] left-72" />
                        <img src={community} width={250} height={150} alt="" className="absolute bottom-[100%] right-72" />
                    </div>
                </div>
            </div>

            {/* What we do */}
            <div className='flex justify-between w-full mb-12'>
                <div className='mb-2'>
                    <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 mb-2 font-bold'>
                        What we do
                    </span>
                    <div>
                        <p className='text-4xl font-bold py-1'>Build. Create. Educate.</p>
                        <p className='text-4xl font-bold py-1'>On Avalanche. For Africa.</p>
                    </div>
                </div>

                <div className='w-[19%]'>
                    <div className='text-gray-600 text-lg'>
                        <p>Our mission is to bridge the gap between innovation and opportunity by cultivating an inclusive environment where tech talent thrives, ideas grow, and impact multiplies.</p>
                    </div>
                    <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mt-3 rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer'>
                        Learn more
                        <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden' />
                        <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden' />
                    </div>
                </div>
            </div>

            <div className="-ml-8" style={{ width: 'calc(100% + 4rem)' }}>
                {/* Build Section */}
                <div className="bg-[#F1E228] cursor-pointer px-5 py-3 flex items-center hover:pb-10 transition-all duration-500 ease-in-out">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                            <img src={rocket} alt="" width={60} height={60} className="text-black" />
                        </div>
                        <div className="flex-1 flex justify-end">
                            <div className="w-[35%]">
                                <h2 className="text-4xl font-semibold text-black">Build</h2>
                                <p className="text-lg text-black py-2">
                                    We support developers and startups through grants, mentorship, and technical workshops to build impactful dApps on Avalanche.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Section */}
                <div className="bg-[#11B55A] cursor-pointer px-5 py-3 flex items-center hover:pb-10 transition-all duration-500 ease-in-out">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                            <img src={gamepad} alt="" width={60} height={60} className="text-white" />
                        </div>
                        <div className="flex-1 flex justify-end">
                            <div className="w-[35%]">
                                <h2 className="text-4xl font-semibold text-white">Create</h2>
                                <p className="text-lg text-white py-2">We empower African artists, designers, and storytellers to express their creativity using Avalanche-powered NFTs and platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educate Section */}
                <div className="bg-[#2996F3] cursor-pointe px-5 py-3 flex items-center hover:pb-10 transition-all duration-500 ease-in-out">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                            <img src={scroll} alt="" width={60} height={60} className="text-white" />
                        </div>
                        <div className="flex-1 flex justify-end">
                            <div className="w-[35%]">
                                <h2 className="text-4xl font-semibold">Educate</h2>
                                <p className="text-lg py-2">
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