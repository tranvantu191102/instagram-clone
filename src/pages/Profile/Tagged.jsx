import React from 'react'

import taggedImage from '../../assets/images/tagged.png'

const Tagged = () => {
    return (
        <div className='w-full min-h-[100px] flex items-center justify-center m-auto flex-col'>

            <div className="mt-30 flex flex-col items-center justify-center">
                <span className='px-6 my-7 py-4 border-[1px] border-black rounded-lg text-xl'>
                    <img src={taggedImage}
                        className="w-[28px] h-[28px]"
                        alt="" />
                </span>
                <span className='text-2xl text-primary-text font-thin'>Tagged</span>
            </div>
            <p className='w-[350px] text-base text-primary-text font-normal mt-4 mb-10'>
                When people tag you in photos, they'll appear here.
            </p>
        </div>

    )
}

export default Tagged