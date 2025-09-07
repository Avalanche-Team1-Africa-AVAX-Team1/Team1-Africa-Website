import logo from '../assets/avalanche_logo.png'
import telegram from '../assets/telegram.svg'
import youtube from '../assets/youtube.svg'
import x from '../assets/x.svg'
import discord from '../assets/discord.svg'
import instagram from '../assets/instagram.svg'
import reddit from '../assets/reddit.svg'
import github from '../assets/github.svg'



const Footer = () => {
    return (
        <div className='bg-black text-white p-8'>
            <div className='flex justify-between'>
                <div>
                    <div>
                        <img src={logo} alt="team1-logo" width={150} height={150} />
                        <p className='text-lg text-[#A1A1A1] leading-relaxed -tracking-wider w-[40%] my-8'>A community-led initiative supporting builders, creators, and educators in the Avalanche ecosystem across the continent.</p>
                    </div>
                     <div className='flex items-center gap-4'>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={telegram} alt="telegram" className='w-10 h-10' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={youtube} alt="youtube" className='w-10 h-10' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={x} alt="x" className='w-10 h-10' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={discord} alt="discord" className='w-10 h-10' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={instagram} alt="instagram" className='w-10 h-10' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={reddit} alt="reddit" className='w-10 h-10' />
                         </a>
                         <a href="#" className='hover:scale-110 hover:brightness-125 transition-all duration-300'>
                             <img src={github} alt="github" className='w-10 h-10' />
                         </a>
                     </div>
                </div>

                <div className='flex gap-20'>
                    {/* Company */}
                    <div>
                        <p className='text-xl font-semibold'>Company</p>
                         <ul className='text-lg text-[#A1A1A1] font-roboto tracking-wider leading-loose'>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>About Us</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Events</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Partners</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Contact us</li>
                             <li className='hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer'>Privacy Policy</li>
                         </ul>
                    </div>

                    {/* Resources */}
                    <div >
                        <p className='text-xl font-semibold'>Resources</p>
                         <ul className='text-lg text-[#A1A1A1] font-roboto tracking-wider leading-loose'>
                             <li className='hover:text-blue-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Blog</li>
                             <li className='hover:text-blue-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>Learn more</li>
                             <li className='hover:text-blue-400 hover:translate-x-2 transition-all duration-300 cursor-pointer'>FAQs</li>
                         </ul>
                    </div>

                    {/* Community */}
                    <div >
                        <p className='text-xl font-semibold'>Community</p>
                         <ul className='text-lg text-[#A1A1A1] font-roboto tracking-wider leading-loose'>
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
            <div className='my-10'>
                <p className="text-[170px] flex justify-center items-center font-bold text-white select-none whitespace-nowrap" style={{ fontFamily: "'Press Start 2P', monospace" }}>TEAM1 AFRICA</p>
            </div>

            {/* Copyright */}
            <div className='flex justify-between items-center'>
                <p>© 2025 Team1 Africa. All rights reserved.</p>
                <p>Deon Lexjo Deo</p>
            </div>
        </div>
    );
}

export default Footer;