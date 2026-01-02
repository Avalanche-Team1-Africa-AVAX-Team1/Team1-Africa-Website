import { useState, useEffect, useRef } from 'react';

import AnimatedText from './AnimatedText';
import AppImage from './ui/AppImage';
import event1 from '../assets/event1-img.png'
import event1Webp from '../assets/event1-img.webp'
import event2 from '../assets/event2-img.png'
import event2Webp from '../assets/event2-img.webp'
import avaxlogo from '../assets/logo.png'
import characterVideo from '../assets/videos/character.mp4'
import computerVideo from '../assets/videos/computer.mp4'
import homeVideo from '../assets/videos/home.mp4'
import robotVideo from '../assets/videos/robot.mp4'

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

            {/* Main content container */}
            <div className='w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative'>
                {/* Side images - positioned at extreme corners */}
                <AppImage
                    src={event1}
                    srcWebp={event1Webp}
                    alt="event1"
                    className='hidden xl:block absolute aspect-[3/4] rounded-2xl pointer-events-none z-0 xl:w-[240px] xl:left-[-280px] xl:top-0 2xl:w-[280px] 2xl:left-[-320px]'
                />
                <AppImage
                    src={event2}
                    srcWebp={event2Webp}
                    alt="event2"
                    className='hidden xl:block absolute aspect-[3/4] rounded-2xl pointer-events-none z-0 xl:w-[240px] xl:right-[-280px] xl:bottom-0 2xl:w-[280px] 2xl:right-[-320px]'
                />
                {/* Text content */}
                <AnimatedText
                    variant="slideUp"
                    delay={0.2}
                    className='w-full text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[60px] font-["Outfit"] font-[300] tracking-[-0.02em] text-black'
                >
                    <div className='text-left leading-[1.05] md:leading-[1.08] lg:leading-[1.1] w-fit mx-auto'>
                        <p className='mb-1'>Team1 Africa <span className='inline-block w-[100px] h-[100px] relative align-middle mx-[0.15em] mb-[-15px]'>
                            <video key="character-video" src={characterVideo} autoPlay loop muted playsInline />
                        </span> is Avalanche's</p>
                        African
                        <span className='inline-block w-[100px] h-[100px] relative align-middle mx-[0.15em] mb-[-15px]'>
                            <video key="home-video" src={homeVideo} autoPlay loop muted playsInline />
                        </span>
                        network empowering <span className='inline-block w-[100px] h-[100px] relative align-middle mx-[0.15em] mb-[-15px]'>
                            <video key="computer-video" src={computerVideo} autoPlay loop muted playsInline />
                        </span>
                        <br className="block" />
                        Builders <span className='inline-block w-[100px] h-[100px] relative align-middle mx-[0.15em] mb-[-15px]'>
                            <video key="robot-video" src={robotVideo} autoPlay loop muted playsInline />
                        </span> and Creators

                        <br className="block" />
                        with resources to thrive on
                        <span className='inline-block relative align-middle mx-[0.15em] mb-[0.1em] w-[0.7em] h-[0.7em]'>
                            <img src={avaxlogo} alt="logo" className='w-full h-full object-contain' />
                        </span>
                        valanche.
                    </div>
                </AnimatedText>
            </div>

            {/* Stats counters */}
            <div className='flex flex-col md:flex-row gap-[10%] md:gap-[8%] xl:gap-24 2xl:gap-32 text-center mt-[15%] md:mt-[8%] xl:mt-12 xl:ml-0 justify-center w-full font-["Outfit"]'>
                <div className='leading-tight mb-[8%] md:mb-0'>
                    <p className='text-[4.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[70px]'>{eventsCount}</p>
                    <p className='text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-semibold mt-[0.3em]'>Events</p>
                </div>
                <div className='leading-tight mb-[8%] md:mb-0'>
                    <p className='text-[4.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[70px]'>{membersCount}+</p>
                    <p className='text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-semibold mt-[0.3em]'>Community Members</p>
                </div>
                <div className='leading-tight'>
                    <p className='text-[4.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[70px]'>{partnersCount}</p>
                    <p className='text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-semibold mt-[0.3em]'>Game Partners</p>
                </div>
            </div>

        </div>
    );
}

export default Stats;