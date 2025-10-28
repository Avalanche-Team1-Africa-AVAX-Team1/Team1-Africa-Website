import communityImg from '../assets/community.png'
import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'

const AboutUs = () => {
  return (
    <div>
      <div>
        {/* Reduce padding on smaller screens; maintain 4K baseline */}
        <div className='relative py-16 lt-1440:py-14 lt-1024:py-12 lt-768:py-10 lt-480:py-8'>
          {/* Main Content */}
          <div className=''>

            {/* About Us Badge */}
            <div className='mb-2'>
              <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-semibold'>
                About us
              </span>
            </div>

            {/* Keep two-column on md+, stack on small; tighten gaps on small */}
            <div className='flex flex-col md:flex-row items-start justify-between w-full gap-8 lt-1024:gap-6 lt-768:gap-5 lt-480:gap-4'>
              <div className='lg:basis-[60%] md:basis-[120%]'>
                {/* Scale heading down progressively on smaller screens; 4K unchanged */}
                <h1 className='text-4xl lt-1440:text-3xl lt-1024:text-2xl lt-768:text-xl lt-480:text-lg font-bold text-black leading-tight'>
                  Empowering Africa's Builders, Creators & Educators on Avalanche
                </h1>
              </div>

              <div className='lg:basis-[40%] lt-1024:basis-auto lt-1024:max-w-[680px]'> {/* Relax fixed basis on tablet/phone */}
                <p className='text-lg lt-1440:text-base lt-1024:text-[0.95rem] lt-768:text-[0.9rem] lt-480:text-[0.875rem] text-gray-600 leading-relaxed mb-6'>
                  We empower local talent, foster global partnerships,
                  and support the next generation of Web3 leaders
                  through hands-on events, education, and collaboration.
                </p>

                {/* Shrink CTA padding and gap on smaller screens */}
                <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 lt-1024:px-5 lt-1024:py-2.5 lt-768:px-4 lt-768:py-2 rounded-full font-medium transition-colors flex items-center gap-2 lt-768:gap-1.5 group cursor-pointer'>
                  About Us
                  {/* Scale icons down on smaller screens */}
                  <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden lt-768:w-4 lt-768:h-4' />
                  <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden lt-768:w-4 lt-768:h-4' />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className='relative'>
        {/* Make hero image fluid only on smaller screens; leave 4K as-is */}
        <img src={communityImg} alt="" className='lt-1440:w-full lt-1440:h-auto' />

        {/* Play Video Button Overlay */}
        <div className='absolute inset-0 flex items-center justify-center'>
          {/* Scale overlay CTA for smaller screens */}
          <button className='bg-white/90 hover:bg-white text-black px-8 py-4 lt-1024:px-6 lt-1024:py-3 lt-768:px-5 lt-768:py-2.5 rounded-full font-medium shadow-lg transition-all hover:scale-105 flex items-center gap-3 lt-768:gap-2'>
            <div className='w-8 h-8 lt-768:w-7 lt-768:h-7 lt-480:w-6 lt-480:h-6 bg-black rounded-full flex items-center justify-center'>
              <svg className='w-4 h-4 lt-768:w-3.5 lt-768:h-3.5 text-white ml-0.5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
            <p className='lt-768:text-sm'>Play Video</p> {/* Reduce label size on smaller screens */}
            <svg className='w-4 h-4 lt-768:w-3.5 lt-768:h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>

        {/* Audio Control Buttons on Image */}
        {/* Nudge controls inward and shrink on smaller screens */}
        <div className='absolute bottom-8 right-8 lt-768:bottom-6 lt-768:right-6 lt-480:bottom-4 lt-480:right-4 flex flex-col gap-4'>
          {/* Sound Toggle Button */}
          <button className='w-14 h-14 lt-768:w-12 lt-768:h-12 lt-480:w-10 lt-480:h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors'>
            <svg className='w-6 h-6 lt-768:w-5 lt-768:h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
            </svg>
          </button>

          {/* Mute Button */}
          <button className='w-14 h-14 lt-768:w-12 lt-768:h-12 lt-480:w-10 lt-480:h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors'>
            <svg className='w-6 h-6 lt-768:w-5 lt-768:h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
