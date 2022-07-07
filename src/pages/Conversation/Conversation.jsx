import React from 'react'
import { faChevronDown, faPenToSquare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UserCard from './UserCard'

const Conversation = () => {
    return (
        <div className='mt-[60px] flex items-center justify-center bg-second-bg'>
            <div className='w-[935px] h-[calc(100vh-100px)] flex justify-center items-start bg-primary-bg mt-5 border-[1px] border-gray-bg rounded'>
                <div className='w-[350px] border-r-[1px] border-gray-bg'>
                    <div className='flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-bg'>
                        <div></div>
                        <button>
                            <span className='text-lg text-primary-text font-semibold mr-2'>tranvantu_170</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                        <div className='text-xl p-1 cursor-pointer'>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                    </div>
                    <div>
                        <UserCard />
                        <UserCard />
                    </div>
                </div>
                <div className='flex-1 h-full flex items-center justify-center flex-col'>
                    <div className='py-7 px-8 border-2 border-primary-text rounded-full'>
                        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
                    </div>
                    <h3 className='text-xl font-light text-primary-text mt-2'>Your Messages</h3>
                    <p className='text-base font-normal text-gray-text mt-2'>Send private photos and messages to a friend or group.</p>
                    <button className='p-2 rounded-lg mt-4 text-white-text font-semibold bg-blue-text'>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Conversation