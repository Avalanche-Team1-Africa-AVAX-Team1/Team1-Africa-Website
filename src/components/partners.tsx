const Partners = () => {
    return (
        <div className='px-4 py-16 flex flex-col items-center justify-center'>
            {/* PartnersBadge */}
            <div className='mb-2'>
                <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-bold'>
                    Our Partners
                </span>
            </div>

            <div className='text-center w-[40%]'>
                <p className='text-5xl font-bold leading-tight'>Trusted By Top Blockchain Teams That Know Every Step Matters.</p>
                <p className='text-lg text-gray-600 pt-4'>We proudly collaborate with organizations that believe in Africa’s potential.</p>
            </div>
        </div>
    );
}

export default Partners;