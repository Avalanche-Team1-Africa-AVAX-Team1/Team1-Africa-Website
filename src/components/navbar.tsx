import logo from '../assets/logo.png'
import arrow from '../assets/arrow.svg'
import arrowUp from '../assets/arrow-up.svg'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between'>
                <div>
                    <img src={logo} alt="team1-logo" width={50} height={50} />
                </div>
            </div>

            {/* tabs */}
            <div className='flex items-center justify-between'>
                <ul className='flex items-center gap-8 cursor-pointer'>
                    <li>Home</li>
                    <li>About</li>
                    <div className='flex gap-2'>
                        <li>Events</li>
                        <img src={arrow} alt="arrow" />
                    </div>
                    <div className='flex gap-2'>
                        <li>Games</li>
                        <img src={arrow} alt="arrow" />
                    </div>
                    <div className='flex gap-2'>
                        <li>Community</li>
                        <img src={arrow} alt="arrow" />
                    </div>
                </ul>
            </div>

            {/* buttons */}
            <div className='flex items-center gap-4 text-2xl bg-black text-white px-4 py-3 rounded-full w-fit'>
                <div className='text-lg'>Join the community</div>
                <img src={arrowUp} alt="arrow" width={30} height={30} />
            </div>
        </div>
    );
}

export default Navbar;