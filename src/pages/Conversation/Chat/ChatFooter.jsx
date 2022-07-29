import React, { useState, useRef, useEffect } from 'react'
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons'

import loveImage from '../../../assets/images/chat/heart.png'
import fileImage from '../../../assets/images/chat/file.png'

const ChatFooter = () => {
    const [showEmoji, setShowEmoji] = useState(false)
    const emojiRef = useRef()

    const onEmojiClick = (event, emojiObject) => {

    };

    useEffect(() => {

    }, [])

    return (
        <div className='h-[84px] w-full p-5'>
            <div className='h-full flex items-center justify-between border-border-color rounded-2xl'>
                <div ref={emojiRef}
                    className="relative"
                >
                    <FontAwesomeIcon
                        icon={faFaceGrinBeam}
                        className='text-xl cursor-pointer text-gray-text'
                        onClick={() => setShowEmoji(!showEmoji)}
                    />
                    {
                        showEmoji &&
                        <div className="absolute bottom-full left-0">
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    }
                </div>
                <input
                    type="text"
                    placeholder='Message...'
                    className='placeholder:text-base placeholder:text-primary-color focus:text-gray-color
                    
                    '
                />
                <div className="">
                    <div className="">
                        <img
                            src={fileImage}
                            alt=""
                            className='w-6 h-6'
                        />
                    </div>
                    <div className="">
                        <img
                            src={loveImage} alt=""
                            className='w-6 h-6' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatFooter