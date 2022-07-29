import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

const Saved = () => {
    return (
        <div className='w-full min-h-[100px] flex items-center justify-center m-auto flex-col'>

            <div className="mt-30 flex flex-col items-center justify-center">
                <span className='px-6 my-7 py-4 border-[1px] border-black rounded-full text-xl'>
                    <FontAwesomeIcon icon={faBookmark} />
                </span>
                <span className='text-2xl text-primary-text font-thin'>Save</span>
            </div>
            <p className='w-[350px] text-base text-primary-text font-normal mt-4 mb-10'>
                Save photos and videos that you want to see again. No one is notified,
                and only you can see what you've saved.
            </p>
        </div>
    )
}

export default Saved