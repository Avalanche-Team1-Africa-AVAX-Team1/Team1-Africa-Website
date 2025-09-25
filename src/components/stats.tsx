import { useState, useEffect, useRef } from 'react';
import event1 from '../assets/event1-img.png'
import event2 from '../assets/event2-img.png'

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [eventsCount, setEventsCount] = useState(0);
    const [membersCount, setMembersCount] = useState(0);
    const [partnersCount, setPartnersCount] = useState(0);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            // Animate Events count (0 to 12)
            const eventsInterval = setInterval(() => {
                setEventsCount(prev => {
                    if (prev >= 12) {
                        clearInterval(eventsInterval);
                        return 12;
                    }
                    return prev + 1;
                });
            }, 50);

            // Animate Members count (0 to 200)
            const membersInterval = setInterval(() => {
                setMembersCount(prev => {
                    if (prev >= 200) {
                        clearInterval(membersInterval);
                        return 200;
                    }
                    return prev + 5;
                });
            }, 30);

            // Animate Partners count (0 to 40)
            const partnersInterval = setInterval(() => {
                setPartnersCount(prev => {
                    if (prev >= 40) {
                        clearInterval(partnersInterval);
                        return 40;
                    }
                    return prev + 1;
                });
            }, 40);

            return () => {
                clearInterval(eventsInterval);
                clearInterval(membersInterval);
                clearInterval(partnersInterval);
            };
        }
    }, [isVisible]);

    return(
            <div ref={statsRef} className='relative flex h-screen lt-1024:h-auto lt-1024:py-16 flex-col justify-around md:justify-center items-center overflow-hidden'>
                <div className='flex justify-center items-center px-4'>
                    {/* Scale intro paragraph on smaller screens; constrain width */}
                    <p className='text-[1.4rem] md:text-[50px] lt-1024:text-[1.25rem] lt-768:text-[1.1rem] lt-480:text-[1rem] font-semibold text-center md:w-[50%] w-full max-w-[900px]'>Team1 Africa <span className='text-[#6D6D6D]'>is a vibrant grassroots movement committed to equipping</span> African builders, creators, and educators with the tools, resources, and opportunities to thrive in the Avalanche blockchain ecosystem.</p>
                </div>

                {/* positioned images */}
                {/* Adjust positioned images scale/offset on smaller screens */}
                <img src={event1} alt="event1" width={300} height={150} className='hidden md:block absolute bottom-36 left-20 xl:left-20 lg:left-16' />
                <img src={event2} alt="event2" width={300} height={150} className='hidden md:block absolute top-36 right-20 xl:right-20 lg:right-16' />

                <div className='flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-40 lt-1024:gap-10 lt-768:gap-8 text-center'>
                    <div className='leading-tight'>
                        {/* Scale numbers down on smaller screens */}
                        <p className='text-[70px] xl:text-[150px] lt-1024:text-[56px] lt-768:text-[48px] lt-480:text-[40px]'>{eventsCount}</p>
                        <p className='text-xl font-semibold'>Events</p>
                    </div>
                    <div className='leading-tight'>
                        <p className='text-[70px] xl:text-[150px] lt-1024:text-[56px] lt-768:text-[48px] lt-480:text-[40px]'>{membersCount}+</p>
                        <p className='text-xl font-semibold'>Community Members</p>
                    </div>
                    <div className='leading-tight'>
                        <p className='text-[70px] xl:text-[150px] lt-1024:text-[56px] lt-768:text-[48px] lt-480:text-[40px]'>{partnersCount}</p>
                        <p className='text-xl font-semibold'>Game Partners</p>
                    </div>
                </div>

            </div>
    );
}

export default Stats;
