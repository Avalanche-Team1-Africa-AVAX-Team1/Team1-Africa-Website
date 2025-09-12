import React, { useState, useEffect, useRef } from 'react';
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
            <div ref={statsRef} className='relative flex h-screen flex-col justify-center items-center overflow-hidden'>
                <div className='flex justify-center items-center'>
                    <p className='text-[50px] font-semibold text-center w-[50%]'>Team1 Africa <span className='text-[#6D6D6D]'>is a vibrant grassroots movement committed to equipping</span> African builders, creators, and educators with the tools, resources, and opportunities to thrive in the Avalanche blockchain ecosystem.</p>
                </div>

                {/* positioned images */}
                <img src={event1} alt="event1" width={300} height={150} className='absolute bottom-36 left-20' />
                <img src={event2} alt="event2" width={300} height={150} className='absolute top-36 right-20' />

                <div className='flex justify-center items-center gap-40 text-center'>
                    <div className='leading-tight'>
                        <p className='text-[150px]'>{eventsCount}</p>
                        <p className='text-xl font-semibold'>Events</p>
                    </div>
                    <div className='leading-tight'>
                        <p className='text-[150px]'>{membersCount}+</p>
                        <p className='text-xl font-semibold'>Community Members</p>
                    </div>
                    <div className='leading-tight'>
                        <p className='text-[150px]'>{partnersCount}</p>
                        <p className='text-xl font-semibold'>Game Partners</p>
                    </div>
                </div>

            </div>
    );
}

export default Stats;