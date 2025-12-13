import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'
import collage from '../assets/collage.png'
import AnimatedText from './AnimatedText'
import MagneticButton from './MagneticButton'

const Gallery = () => {
    return (
        <div className='pt-16 lt-1440:pt-14 lt-1024:pt-12 lt-768:pt-10 lt-480:pt-8 flex flex-col items-center justify-center'> {/* Reduce top padding on smaller screens; keep 4K baseline */}
            {/* GalleryBadge */}
            <div className='flex flex-col items-center justify-center'>
                <AnimatedText variant="scale" delay={0.1}>
                    <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-bold'>
                        Gallery
                    </span>
                </AnimatedText>
                {/* Scale heading down progressively on smaller screens */}
                <AnimatedText variant="slideUp" delay={0.2}>
                    <p className='text-[48px] lt-1440:text-[40px] lt-1024:text-[34px] lt-768:text-[28px] lt-480:text-[24px] font-bold'>Africa is Building</p>
                </AnimatedText>

                <AnimatedText variant="slideUp" delay={0.3}>
                    <p className='text-xl lt-1440:text-lg lt-1024:text-base lt-768:text-[0.95rem] text-gray-600 text-center'>Explore moments of innovation, learning, and celebration from across the continent.</p>
                </AnimatedText>
            </div>

            {/* Shrink CTA sizing on smaller screens */}
            <AnimatedText variant="fadeIn" delay={0.4}>
                <MagneticButton className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mt-3 lt-1024:px-5 lt-1024:py-2.5 lt-768:px-4 lt-768:py-2 rounded-full font-medium transition-colors flex items-center gap-2 lt-768:gap-1.5 group'>
                    View Full Gallery
                    {/* Icons scale with screen size */}
                    <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden lt-768:w-4 lt-768:h-4' />
                    <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden lt-768:w-4 lt-768:h-4' />
                </MagneticButton>
            </AnimatedText>

            {/* Make collage image fluid on smaller screens while preserving 4K width */}
            <AnimatedText variant="slideUp" delay={0.5} className='w-full flex justify-center'>
                <img src={collage} alt="collage" loading="lazy" width={1800} height={1000} className='mt-16 lt-1440:mt-14 lt-1024:mt-12 lt-768:mt-10 lt-480:mt-8 cursor-pointer lt-1440:w-full lt-1440:h-auto' />
            </AnimatedText>
        </div>
    );
}

export default Gallery;