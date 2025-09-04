import builders from '../assets/builders.png'
import community from '../assets/communitybanner.png'
import pixel from '../assets/pixel-avax.png'

import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'



const Build = () => {
    return (
        <div className=''>
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
            <div className='flex justify-between w-full'>
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


        </div>
    );
}

export default Build;