import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'
import collage from '../assets/collage.png'

const Gallery = () => {
    return (
        <div className='px-4 pt-16 flex flex-col items-center justify-center'>
            {/* GalleryBadge */}
            <div className='flex flex-col items-center justify-center'>
                <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-bold'>
                    Gallery
                </span>
                <p className='text-[48px] font-bold'>Africa is Building</p>

                <p className='text-xl text-gray-600'>Explore moments of innovation, learning, and celebration from across the continent.</p>
            </div>

            <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mt-3 rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer'>
                View Gallery
                <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden' />
                <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden' />
            </div>

            <img src={collage} alt="collage" width={1800} height={1000} className='mt-16 cursor-pointer' />
        </div>
    );
}

export default Gallery;