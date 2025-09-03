import communityImg from '../assets/community.png'

const AboutUs = () => {
  return (
    <div>
      <div>
        <div className='relative px-4 py-16'>
          {/* Main Content */}
          <div className=''>

            {/* About Us Badge */}
            <div className='mb-2'>
              <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-semibold'>
                About us
              </span>
            </div>

            <div className='flex items-start justify-between w-full gap-8'>
              <div className='basis-[30%]'>
                <h1 className='text-4xl font-bold text-black leading-tight'>
                  Empowering Africa's Builders, Creators & Educators on Avalanche
                </h1>
              </div>

              <div className='basis-[22%]'>
                <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                  We empower local talent, foster global partnerships,
                  and support the next generation of Web3 leaders
                  through hands-on events, education, and collaboration.
                </p>

                <button className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2'>
                  About Us
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Video Overlay */}
          <div className='relative'>
            {/* <img
              src={communityImg}
              alt='Team1 Africa Community'
              className='w-full h-auto rounded-2xl shadow-2xl'
            /> */}

            {/* Play Video Button Overlay */}
            {/* <div className='absolute inset-0 flex items-center justify-center'>
              <button className='bg-white/90 hover:bg-white text-black px-8 py-4 rounded-full font-medium shadow-lg transition-all hover:scale-105 flex items-center gap-3'>
                <div className='w-8 h-8 bg-black rounded-full flex items-center justify-center'>
                  <svg className='w-4 h-4 text-white ml-0.5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
                <p>Play Video</p>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
            </div> */}
          </div>

          {/* Floating Action Buttons */}
          <div className='fixed bottom-8 right-8 flex flex-col gap-4'>
            {/* Sound Toggle Button */}
            <button className='w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
              </svg>
            </button>

            {/* Mute Button */}
            <button className='w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
              </svg>
            </button>
          </div>
        </div>
      </div>


      <div>
        <img src={communityImg} alt="" />
      </div>
    </div>
  )
}

export default AboutUs
