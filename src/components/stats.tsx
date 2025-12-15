import { useState, useEffect, useRef } from 'react';

import AnimatedText from './AnimatedText';
import AppImage from './ui/AppImage';
import event1 from '../assets/event1-img.png'
import event1Webp from '../assets/event1-img.webp'
import event2 from '../assets/event2-img.png'
import event2Webp from '../assets/event2-img.webp'
import avaxlogo from '../assets/logo.png'
import otgVideo from '../assets/videos/otg.mp4'
import bloodloopVideo from '../assets/videos/bloodloop-use.mp4'

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
            // Animate Events count (0 to 100)
            const eventsInterval = setInterval(() => {
                setEventsCount(prev => {
                    if (prev >= 100) {
                        clearInterval(eventsInterval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);

            // Animate Members count (0 to 500)
            const membersInterval = setInterval(() => {
                setMembersCount(prev => {
                    if (prev >= 500) {
                        clearInterval(membersInterval);
                        return 500;
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
        <div ref={statsRef} className='w-full 2xl:min-h-screen md:min-h-[calc(100vh-20rem)] lt-1024:min-h-[calc(100vh-20rem)] relative flex flex-col justify-center items-center py-[10%] px-[6%] xl:py-10 xl:h-auto overflow-visible'>

            {/* Main content container - everything percentage-based, but fixed on XL */}
            <div className='w-full max-w-[92%] md:max-w-[85%] lg:max-w-[80%] xl:w-[calc(100%-14rem)] 2xl:w-[calc(100%-24rem)] xl:max-w-none mx-auto relative'>

                {/* Side images positioned with percentages */}
                <AppImage
                    src={event1}
                    srcWebp={event1Webp}
                    alt="event1"
                    className='hidden md:block absolute aspect-[3/4] rounded-xl pointer-events-none z-0 md:w-24 md:-left-[20%] md:top-[-30%] lg:w-32 xl:left-[-45%] xl:top-[-60%] 2xl:w-[350px]'
                />
                <AppImage
                    src={event2}
                    srcWebp={event2Webp}
                    alt="event2"
                    className='hidden md:block absolute aspect-[3/4] rounded-xl pointer-events-none z-0 md:w-24 md:-right-[20%] md:bottom-[-20%] lg:w-32 xl:right-[-45%] xl:bottom-[-60%] 2xl:w-[350px]'
                />

                {/* Text content */}
                <AnimatedText
                    variant="slideUp"
                    delay={0.2}
                    className='w-full text-[2.75rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[34px] 2xl:text-[40px] font-inter tracking-tight'
                >
                    <p className='font-normal text-left xl:text-center leading-[1.1] md:leading-[1.2] lg:leading-[1.25] xl:leading-none'>
                        Team1 <span className='text-[#ef4444]'>Africa</span>
                        <span className='inline-block w-[1.2em] h-[1.2em] xl:w-28 xl:h-28 xl:-mb-3 relative align-middle mx-[0.15em]'>
                            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBxaXg0bTFmOGZnYjN3YWJ6dGJxNWJxenBoZjV0OXl5enJ5dHZ6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6MbtUNOSRhgVPTFK/giphy.gif" alt="" className='w-full h-full object-contain' />
                        </span>
                        is Avalanche's
                        <span className='inline-block w-[1.2em] h-[1.2em] xl:w-28 xl:h-28 xl:-mb-6 relative align-middle mx-[0.15em]'>
                            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXQ3ZTh5YmpoNWRnbWIzcmg5Nnp3eXI3Mjk0OHR4eHZ5bDBydzVpaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlQXlQ3nHyLMvte/giphy.gif" alt="" className='w-full h-full object-contain' />
                        </span>
                        African
                        <span className='inline-block w-[2em] h-[1em] xl:w-40 xl:h-20 relative align-middle mx-[0.2em]'>
                            <video key="bloodloop-video" src={bloodloopVideo} autoPlay loop muted playsInline className='w-full h-full object-cover rounded-full border-2 border-white' />
                        </span>
                        network empowering <span className='text-[#ef4444]'>Builders</span> and Creators
                        <span className='inline-block w-[2em] h-[1em] xl:w-40 xl:h-20 relative align-middle mx-[0.2em]'>
                            <video key="otg-video" src={otgVideo} autoPlay loop muted playsInline className='w-full h-full object-cover rounded-full border-2 border-white' />
                        </span>
                        with resources to thrive on
                        <span className='inline-block relative align-middle mx-[0.15em]'>
                            <img src={avaxlogo} alt="logo" className='w-[0.9em] h-[0.9em] xl:w-10 xl:h-10 object-contain' />
                        </span>
                        <span>valanche.</span>
                    </p>
                </AnimatedText>
            </div>

            {/* Stats counters */}
            {/* <div className='flex flex-col md:flex-row justify-center items-center gap-[10%] md:gap-[8%] xl:gap-16 2xl:gap-40 text-center mt-[15%] md:mt-[10%] xl:mt-6 xl:ml-12'>
                <div className='leading-tight mb-[8%] md:mb-0'>
                    <p className='text-[4.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[100px] font-bold'>{eventsCount}</p>
                    <p className='text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-semibold mt-[0.3em]'>Events</p>
                </div>
                <div className='leading-tight mb-[8%] md:mb-0'>
                    <p className='text-[4.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[100px] font-bold'>{membersCount}+</p>
                    <p className='text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-semibold mt-[0.3em]'>Community Members</p>
                </div>
                <div className='leading-tight'>
                    <p className='text-[4.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[100px] font-bold'>{partnersCount}</p>
                    <p className='text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-semibold mt-[0.3em]'>Game Partners</p>
                </div>
            </div> */}

        </div>
    );
}

export default Stats;