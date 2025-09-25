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

    return (
        <div ref={statsRef} className='relative flex h-screen lt-1920:h-auto lt-1440:py-20 lt-1024:py-16 pb-12 md:pb-16 flex-col justify-around md:justify-center items-center overflow-hidden'> {/* Reduce height on ≤1920 to prevent overlap; add bottom padding */}
            <div className='flex justify-center items-center px-6 lt-1024:px-4'>
                {/* Scale intro paragraph on non-4K screens; constrain width */}
                <p className='text-[1.4rem] md:text-[50px] lt-1920:text-[40px] lt-1440:text-[34px] lt-1024:text-[28px] lt-768:text-[22px] lt-480:text-[1rem] font-semibold text-center md:w-[50%] w-full max-w-[1000px] lt-1440:max-w-[820px] lt-1024:max-w-[680px]'>Team1 Africa <span className='text-[#6D6D6D]'>is a vibrant grassroots movement committed to equipping</span> African builders, creators, and educators with the tools, resources, and opportunities to thrive in the Avalanche blockchain ecosystem.</p>
            </div>

            {/* positioned images */}
            {/* Show decorative images from tablet (md) upward; size/offset adapt to avoid text overlap */}
            <img
                src={event1}
                alt="event1"
                width={300}
                height={150}
                className='hidden md:block absolute md:bottom-24 md:left-0 md:-ml-16 md:w-28 lg:bottom-24 lg:left-0 lg:-ml-10 lg:w-48 xl:bottom-32 xl:left-0 xl:-ml-14 xl:w-56 2xl:bottom-36 2xl:left-20 2xl:ml-0 2xl:w-[300px] rounded-xl pointer-events-none z-0' /> {/* Smaller and pushed out on tablets; scales up on larger screens */}
            <img
                src={event2}
                alt="event2"
                width={300}
                height={150}
                className='hidden md:block absolute md:top-10 md:right-0 md:-mr-16 md:w-28 lg:top-24 lg:right-0 lg:-mr-10 lg:w-48 xl:top-32 xl:right-0 xl:-mr-14 xl:w-56 2xl:top-36 2xl:right-20 2xl:mr-0 2xl:w-[300px] rounded-xl pointer-events-none z-0' /> {/* Smaller and pushed out on tablets; scales up on larger screens */}

            <div className='flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-40 lt-1920:gap-16 lt-1024:gap-10 lt-768:gap-8 text-center px-6 lt-1024:px-4 z-10 md:mt-6'> {/* Ensure counters render above decorative images and add spacing on tablets */}
                <div className='leading-tight'>
                    {/* Scale numbers down on smaller screens */}
                    <p className='text-[70px] xl:text-[100px] lt-1024:text-[60px] lt-768:text-[48px] lt-480:text-[40px]'>{eventsCount}</p>
                    <p className='text-xl font-semibold'>Events</p>
                </div>
                <div className='leading-tight'>
                    <p className='text-[70px] xl:text-[100px] lt-1024:text-[60px] lt-768:text-[48px] lt-480:text-[40px]'>{membersCount}+</p>
                    <p className='text-xl font-semibold'>Community Members</p>
                </div>
                <div className='leading-tight'>
                    <p className='text-[70px] xl:text-[100px] lt-1024:text-[60px] lt-768:text-[48px] lt-480:text-[40px]'>{partnersCount}</p>
                    <p className='text-xl font-semibold'>Game Partners</p>
                </div>
            </div>

        </div>
    );
}

export default Stats;
