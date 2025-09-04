import event1 from '../assets/event1-img.png'
import event2 from '../assets/event2-img.png'


const Stats = () => {
    return(
            <div className='relative flex h-screen flex-col justify-center items-center overflow-hidden'>
                <div className='flex justify-center items-center'>
                    <p className='text-[50px] font-semibold text-center w-[50%]'>Team1 Africa <span className='text-[#6D6D6D]'>is a vibrant grassroots movement committed to equipping</span> African builders, creators, and educators with the tools, resources, and opportunities to thrive in the Avalanche blockchain ecosystem.</p>
                </div>

                {/* positioned images */}
                <img src={event1} alt="event1" width={300} height={150} className='absolute bottom-36 left-20' />
                <img src={event2} alt="event2" width={300} height={150} className='absolute top-36 right-20' />

                <div className='flex justify-center items-center gap-40 text-center'>
                    <div className='leading-tight'>
                        <p className='text-[150px]'>12</p>
                        <p className='text-xl font-semibold'>Events</p>
                    </div>
                    <div className='leading-tight'>
                        <p className='text-[150px]'>200+</p>
                        <p className='text-xl font-semibold'>Community Members</p>
                    </div>
                    <div className='leading-tight'>
                        <p className='text-[150px]'>40</p>
                        <p className='text-xl font-semibold'>Game Partners</p>
                    </div>
                </div>

            </div>
    );
}

export default Stats;