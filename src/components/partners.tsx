import avax from '../assets/avax.png'
import gitcoin from '../assets/gitcoin.png'
import onlydust from '../assets/onlydust.png'
import polygonio from '../assets/polygonio.png'
import refi from '../assets/refi.png'
import spherre from '../assets/spherre.png'
import squads from '../assets/sqauds.png'
import web3bridge from '../assets/web3bridge.png'

const Partners = () => {
    return (
        <div className='px-4 py-16 flex flex-col items-center justify-center'>
            {/* PartnersBadge */}
            <div className='mb-2'>
                <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-bold'>
                    Our Partners
                </span>
            </div>

            <div className='text-center w-[40%] mb-16'>
                <p className='text-5xl font-bold leading-tight'>Trusted By Top Blockchain Teams That Know Every Step Matters.</p>
                <p className='text-lg text-gray-600 pt-4'>We proudly collaborate with organizations that believe in Africa's potential.</p>
            </div>

            {/* Dotted Table Structure */}
            <div className='w-full'>
                {/* Top border - dotted line */}
                <div className='w-full border-dashed border-gray-300 mb-0'></div>

                {/* Table content */}
                <div className='grid grid-cols-4 border-dashed border-gray-300'>
                    {/* Row 1 */}
                    <div className='flex flex-col items-center py-12 px-8 border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:bg-red-50 hover:shadow-lg group'>
                        <img src={avax} alt="avalanche" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-red-600 group-hover:font-semibold'>Avalanche Foundation</p>
                    </div>
                    <div className='flex flex-col items-center py-12 px-8 border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:shadow-lg group'>
                        <img src={gitcoin} alt="gitcoin" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-blue-600 group-hover:font-semibold'>Gitcoin Africa</p>
                    </div>
                    <div className='flex flex-col items-center py-12 px-8 border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:bg-green-50 hover:shadow-lg group'>
                        <img src={web3bridge} alt="web3bridge" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-green-600 group-hover:font-semibold'>Web3Bridge</p>
                    </div>
                    <div className='flex flex-col items-center py-12 px-8 cursor-pointer transition-all duration-300 hover:bg-purple-50 hover:shadow-lg group'>
                        <img src={refi} alt="refi" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-purple-600 group-hover:font-semibold'>ReFiDAO</p>
                    </div>

                    {/* Horizontal dashed line between rows */}
                    <div className='col-span-4 border-t-2 border-dashed border-gray-300'></div>

                    {/* Row 2 */}
                    <div className='flex flex-col items-center py-12 px-8 border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:bg-orange-50 hover:shadow-lg group'>
                        <img src={polygonio} alt="polygonio" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-orange-600 group-hover:font-semibold'>Polygon Guild Accra</p>
                    </div>
                    <div className='flex flex-col items-center py-12 px-8 border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg group'>
                        <img src={onlydust} alt="onlydust" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-indigo-600 group-hover:font-semibold'>Only Dust</p>
                    </div>
                    <div className='flex flex-col items-center py-12 px-8 border-r-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:bg-pink-50 hover:shadow-lg group'>
                        <img src={squads} alt="squads" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-pink-600 group-hover:font-semibold'>Sqauds</p>
                    </div>
                    <div className='flex flex-col items-center py-12 px-8 cursor-pointer transition-all duration-300 hover:bg-teal-50 hover:shadow-lg group'>
                        <img src={spherre} alt="spherre" className='w-48 h-16 object-contain mb-4 transition-transform duration-300 group-hover:scale-110' />
                        <p className='text-sm text-gray-600 text-center transition-colors duration-300 group-hover:text-teal-600 group-hover:font-semibold'>Spherre</p>
                    </div>
                </div>

                {/* Bottom border - dashed line */}
                <div className='w-full border-dashed border-gray-300 mt-0'></div>
            </div>
        </div>
    );
}

export default Partners;