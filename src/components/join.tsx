import union from '../assets/uni.png'
import dexalot from '../assets/dexalot.png'
import arena from '../assets/Arena.png'
import points from '../assets/points.png'

export default function join() {
    return (
        <div className="relative py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 2xl:py-40 hover:cursor-pointer group px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Main heading - centered container */}
            <div className="flex items-center justify-center w-full">
                <p 
                    className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] 2xl:text-[160px] text-center text-muted leading-[1.2] max-w-[1400px]" 
                    style={{ fontFamily: "'Press Start 2P'" }}
                >
                    JOIN OUR COMMUNITY
                </p>
            </div>

            {/* Center Union Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <img
                    src={union}
                    alt="union"
                    className="transform rotate-[-2deg] w-[120px] sm:w-[180px] md:w-[240px] lg:w-[350px] xl:w-[450px] 2xl:w-[550px] transition-all duration-700 ease-in-out opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                />
            </div>

            {/* Points - Top Left */}
            <img
                src={points}
                alt="points"
                className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 transition-all duration-700 ease-in-out -translate-x-full -translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            />

            {/* Arena - Top Right */}
            <img
                src={arena}
                alt="arena"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 transition-all duration-700 ease-in-out translate-x-full -translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            />

            {/* Dexalot - Bottom Left */}
            <img
                src={dexalot}
                alt="dexalot"
                className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 w-10 sm:w-14 md:w-16 lg:w-20 xl:w-24 transition-all duration-700 ease-in-out -translate-x-full translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            />
        </div>
    )
}