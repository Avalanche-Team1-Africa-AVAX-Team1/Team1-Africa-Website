import logo from '../assets/avalanche_logo.png'
import telegram from '../assets/telegram.svg'
import youtube from '../assets/youtube.svg'
import x from '../assets/x.svg'
import discord from '../assets/Discord.svg'
import instagram from '../assets/Instagram.svg'
import reddit from '../assets/reddit.svg'
import github from '../assets/github.svg'



const Footer = () => {
    return (
        <div className='bg-black text-white p-8 lt-1024:p-6 lt-768:p-5 lt-480:p-4'> {/* Responsive padding on smaller screens */}
            <div className='flex justify-between lt-1024:flex-col lt-1024:gap-10'> {/* Stack columns on tablet/phone */}
                <div className='w-full'>
                    <div>
                        <img src={logo} alt="team1-logo" width={150} height={150} />
                        {/* Make paragraph width responsive; keep 4K baseline untouched */}
                        <p className='text-lg lt-1440:text-base lt-1024:text-[0.95rem] text-[#A1A1A1] leading-relaxed -tracking-wider w-[40%] lt-1440:w-[50%] lt-1024:w-full my-8'>A community-led initiative supporting builders, creators, and educators in the Avalanche ecosystem across the continent.</p>
                    </div>
                     <div className='flex items-center gap-4 lt-1024:flex-wrap lt-1024:gap-3'> {/* Wrap icons on tablet/phone */}
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={telegram} alt="telegram" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={youtube} alt="youtube" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={x} alt="x" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={discord} alt="discord" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={instagram} alt="instagram" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={reddit} alt="reddit" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={github} alt="github" className='w-10 h-10 lt-768:w-9 lt-768:h-9 lt-480:w-8 lt-480:h-8' />
                         </a>
                     </div>
                </div>

                {/* Link columns become grid on smaller screens */}
                <div className='flex gap-20 lt-1440:gap-12 lt-1024:grid lt-1024:grid-cols-2 lt-1024:gap-10 lt-768:gap-8 w-full'>
                    {/* Company */}
                    <div>
                        <p className='text-xl lt-1024:text-lg font-semibold'>Company</p>
                         <ul className='text-lg lt-1024:text-base text-[#A1A1A1] font-roboto tracking-wider leading-loose'>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>About Us</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Events</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Partners</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Contact us</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Privacy Policy</li>
                         </ul>
                    </div>

                    {/* Resources */}
                    <div >
                        <p className='text-xl lt-1024:text-lg font-semibold'>Resources</p>
                         <ul className='text-lg lt-1024:text-base text-[#A1A1A1] font-roboto tracking-wider leading-loose'>
                             <li className='hover:text-blue-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Blog</li>
                             <li className='hover:text-blue-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Learn more</li>
                             <li className='hover:text-blue-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>FAQs</li>
                         </ul>
                    </div>

                    {/* Community */}
                    <div >
                        <p className='text-xl lt-1024:text-lg font-semibold'>Community</p>
                         <ul className='text-lg lt-1024:text-base text-[#A1A1A1] font-roboto tracking-wider leading-loose'>
                             <li className='hover:text-red-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Join the community</li>
                             <li className='hover:text-red-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Become a core contributor</li>
                             <li className='hover:text-red-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Sponsor/Host an event</li>
                             <li className='hover:text-red-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Partner with us</li>
                             <li className='hover:text-red-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Games on Avalanche</li>
                         </ul>
                    </div>
                </div>
            </div>

            {/* Team1 Africa */}
            <div className='my-10 lt-1024:my-8 lt-768:my-6 overflow-x-hidden px-2'> {/* Prevent horizontal scroll and add slight side padding on small */}
                <p className="text-[170px] lt-1920:text-[130px] lt-1440:text-[80px] lt-1024:text-[60px] lt-768:text-[48px] lt-480:text-[36px] flex justify-center items-center font-bold text-white select-none whitespace-nowrap lt-1024:whitespace-normal tracking-normal lt-1024:tracking-tight lt-768:tracking-tighter leading-none lt-1024:leading-tight lt-768:leading-snug text-center" style={{ fontFamily: "'Press Start 2P', monospace" }}>TEAM1 AFRICA</p> {/* Allow wrap/adjust tracking & leading on smaller screens */}
            </div>

            {/* Copyright */}
            <div className='flex justify-between items-center lt-768:flex-col lt-768:gap-2'>
                <p className='text-sm lt-1024:text-xs'>© 2025 Team1 Africa. All rights reserved.</p>
                <p className='text-sm lt-1024:text-xs'>Deon Lexjo Dio</p>
            </div>
        </div>
    );
}

export default Footer;
