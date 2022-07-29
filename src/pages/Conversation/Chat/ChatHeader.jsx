import React from 'react'

import telephoneImage from '../../../assets/images/chat/telephone.png'
import cameraImage from '../../../assets/images/chat/video-camera.png'
import infoImage from '../../../assets/images/chat/info.png'
import userImage from '../../../assets/images/user.png'


const ChatHeader = ({ user }) => {
    return (
        <div className='h-[58px] w-full border-b-[1px] border-border-color px-5 flex items-center justify-between'>
            <div className="flex items-center justify-start">
                <img
                    src={user.photoURL || userImage}
                    alt=""
                    className='w-8 h-8 rounded-full mr-3'
                />
                <span>{user.fullname}</span>
            </div>
            <div className="flex items-center justify-end">
                <div className="">
                    <img
                        src={telephoneImage}
                        alt=""
                        className='w-6 h-6 mr-5 cursor-pointer'
                    />
                </div>
                <div className="">
                    <img
                        src={cameraImage}
                        alt=""
                        className='w-6 h-6 mr-5 cursor-pointer'
                    />
                </div>
                <div className="">
                    <img
                        src={infoImage}
                        alt=""
                        className='w-6 h-6 cursor-pointer'
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatHeader