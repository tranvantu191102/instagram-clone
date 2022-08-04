import React from 'react'

import instagramImage from '../../assets/images/instagram.png'
const ScreenMobile = () => {
    return (
        <div className='hidden mob:block h-screen w-full bg-primary-bg'>
            <div className="flex items-center justify-center flex-col">
                <img src={instagramImage} alt="" className='w-[300px] mt-10' />
                <span className='text-red-color text-2xl font-bold'>Sorry</span>
                <p className='text-primary-text text-xl font-semibold'>
                    This version is not support on mobile devices
                </p>
            </div>
        </div>
    )
}

export default ScreenMobile