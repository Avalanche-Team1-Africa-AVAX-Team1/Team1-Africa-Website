import union from '../assets/uni.png'
import dexalot from '../assets/dexalot.png'
import arena from '../assets/Arena.png'
import points from '../assets/Points.png'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function join() {
    const isTouch = useMediaQuery('(hover: none), (pointer: coarse)')
    return (
        <div className={`relative py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 2xl:py-40 hover:cursor-pointer group px-4 sm:px-6 md:px-8 lg:px-12 ${isTouch ? 'touch-active' : ''}` }>
            {/* Main heading + decorative images - centered container */}
            <div className="relative w-fit mx-auto">
                <p
                    className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] 2xl:text-[160px] text-center text-muted leading-[1.2] max-w-[1400px]"
                    style={{ fontFamily: "'Press Start 2P'" }}
                >
                    JOIN OUR COMMUNITY
                </p>

                {/* Center Union Image (anchored to heading) */}
                <img
                    src={union}
                    alt="union"
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-[-2deg] w-[120px] sm:w-[160px] md:w-[220px] lg:w-[300px] xl:w-[380px] 2xl:w-[460px] transition-all duration-700 ease-in-out opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-[.touch-active]:opacity-100 group-[.touch-active]:scale-100 z-10"
                />

                {/* Points - near top-left of text */}
                <img
                    src={points}
                    alt="points"
                    className="pointer-events-none absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 lg:-top-8 lg:-left-8 w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 2xl:w-20 transition-all duration-700 ease-in-out opacity-0 -translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-y-0 group-[.touch-active]:translate-x-0"
                />

                {/* Arena - near top-right of text */}
                <img
                    src={arena}
                    alt="arena"
                    className="pointer-events-none absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 lg:-top-8 lg:-right-8 w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 2xl:w-20 transition-all duration-700 ease-in-out opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-y-0 group-[.touch-active]:translate-x-0"
                />

                {/* Dexalot - near bottom-left of text */}
                <img
                    src={dexalot}
                    alt="dexalot"
                    className="pointer-events-none absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 lg:-bottom-8 lg:-left-8 w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 2xl:w-20 transition-all duration-700 ease-in-out opacity-0 translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-[.touch-active]:opacity-100 group-[.touch-active]:translate-y-0 group-[.touch-active]:translate-x-0"
                />
            </div>
        </div>
    )
}