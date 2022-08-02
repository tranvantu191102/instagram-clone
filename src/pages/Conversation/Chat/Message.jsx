import React, { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

const Message = ({ user, userCurrent, message }) => {

    const [showOptionMessage, setShowOptionMessage] = useState(false)
    const toggleRef = useRef(null)

    const handleShowOptionMessage = () => {
        setShowOptionMessage(true)
    }

    useEffect(() => {
        const handler = (e) => {
            if (!toggleRef.current.contains(e.target)) {
                setShowOptionMessage(false)
            }
        }

        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [])


    return (
        <div
            className={`group flex items-end ${message.user !== user.id ? 'justify-start' : 'justify-end'} my-3`}

        >
            <div className={` w-fit flex items-center ${message.user !== user.id ? 'justify-start' : 'justify-end flex-row-reverse'}`}>
                <div className="">
                    {
                        message.user !== user.id && <img
                            src={user.photoURL}
                            alt=""
                            className='w-7 h-7 rounded-full mr-4'
                        />
                    }
                </div>
                <div className={`py-2 px-4 max-w-[200px] w-fit rounded-3xl mr-2
                 ${message.user === user.id ?
                        'border-[1px] border-border-color bg-primary-bg' :
                        'bg-gray-bg border-[1px] border-gray-bg'}`}
                >
                    <span className='text-base text-primary-text font-normal'>
                        {message.message}
                    </span>
                </div>
                <div className="relative">
                    <div className={`group-hover:block text-gray-text px-4 py-2 cursor-pointer
                     ${showOptionMessage ?
                            'block' :
                            'hidden'}`}
                        onClick={handleShowOptionMessage}
                        ref={toggleRef}
                    >
                        <FontAwesomeIcon icon={faEllipsis}
                        />
                    </div>
                    {
                        user.id !== message.user &&
                        <div className={`absolute bottom-full left-0 ${showOptionMessage ? ' visible opacity-100 pointer-events-auto scale-100 transition-all duration-100 ease-linear'
                            : 'invisible opacity-0 scale-0 pointer-events-none'} `}

                        >
                            <div className="relative bg-black flex items-center justify-center px-3 py-2 rounded-xl">
                                <div className='absolute top-full left-3 border-x-[10px] border-x-transparent border-t-[10px] border-t-black'
                                ></div>
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'>
                                    Like
                                </div>
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'>
                                    Copy
                                </div>
                                <div className='text-base text-white-text font-semibold cursor-pointer'>
                                    Report
                                </div>
                            </div>
                        </div>
                    }
                    {
                        user.id === message.user &&
                        <div className={`absolute bottom-full right-0 ${showOptionMessage ? ' visible opacity-100 pointer-events-auto scale-100 transition-all duration-100 ease-linear'
                            : 'invisible opacity-0 scale-0 pointer-events-none'} `}


                        >
                            <div className="relative bg-black flex items-center justify-center px-3 py-2 rounded-xl">
                                <div className='absolute top-full right-3 border-x-[10px] border-x-transparent border-t-[10px] border-t-black'
                                ></div>
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'>
                                    Like
                                </div>
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'>
                                    Copy
                                </div>
                                <div className='text-base text-white-text font-semibold cursor-pointer'>
                                    Unsend
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>



        </div>
    )
}

export default Message