import React, { useState, useEffect, useRef } from 'react'

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { show } from '../../../redux/reducers/modalReducer';
import { setMessageId } from '../../../redux/reducers/conversationReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import HeartImage from '../../../assets/images/chat/heart-red.png'
import userImage from '../../../assets/images/user.png'

const Message = ({ user, message }) => {

    const [showOptionMessage, setShowOptionMessage] = useState(false)
    const userCurrent = useSelector(state => state.user.userData)
    const toggleRef = useRef(null)
    const dispatch = useDispatch()

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



    const handleLikeMessage = async () => {
        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = doc(db, 'conversations', conversationId, 'content', message.id)
        await updateDoc(conversationRef, {
            like: true
        })

    }

    const handleUnLikeMessage = async () => {
        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = doc(db, 'conversations', conversationId, 'content', message.id)
        await updateDoc(conversationRef, {
            like: false
        })
    }

    const handleUnsendMessage = async () => {
        dispatch(show('MODAL_UNSEND_MESSAGE'))
        dispatch(setMessageId(message.id))
    }


    return (
        <div
            className={`group flex items-end ${message.user !== user.id ? 'justify-start' : 'justify-end'} my-3`}

        >
            <div className={` w-fit flex items-center ${message.user !== user.id ? 'justify-start' : 'justify-end flex-row-reverse'}`}>
                <div className="">
                    {
                        message.user !== user.id && <img
                            src={user.photoURL || userImage}
                            alt=""
                            className='w-7 h-7 rounded-full mr-4'
                        />
                    }
                </div>
                <div className="relative">
                    {
                        message.message ?
                            message.message === 'heart-icon-ttt' ?
                                <img
                                    src={HeartImage}
                                    className='w-[50px]'
                                />
                                :
                                <div className={`py-2 px-4 max-w-[200px] w-fit rounded-3xl mr-2
                             ${message.user === user.id ?
                                        'border-[1px] border-gray-bg bg-gray-bg' :
                                        'bg-primary-bg border-[1px] border-gray-bg'}
                                    ${message.like ? 'mb-2' : ''}`}
                                >
                                    <span className='text-base text-primary-text font-normal'>
                                        {message?.message}
                                    </span>
                                </div>
                            :
                            <div
                                className={message.like ? 'mb-2' : ''}
                            >
                                <img
                                    src={message?.photoURL}
                                    alt=""
                                    className='max-w-[200px] rounded-xl cursor-pointer'
                                />
                            </div>
                    }
                    {message.like &&
                        <div className={`absolute top-[calc(100%-15px)] ${message.user === user.id ? 'right-2' : 'left-2'}`}>
                            <img
                                src={HeartImage}
                                alt=""
                                className='h-6 w-6 bg-gray-bg z-50 p-1 cursor-pointer rounded-full border-[1px] border-white '
                                onClick={handleUnLikeMessage}
                            />
                        </div>}
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
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'
                                    onClick={message.like ? handleUnLikeMessage : handleLikeMessage}
                                >
                                    {message.like ? 'Unlike' : 'Like'}
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
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'
                                    onClick={message.like ? handleUnLikeMessage : handleLikeMessage}
                                >
                                    {message.like ? 'Unlike' : 'Like'}
                                </div>
                                <div className='text-base text-white-text font-semibold mr-2 cursor-pointer'>
                                    Copy
                                </div>
                                <div className='text-base text-white-text font-semibold cursor-pointer'
                                    onClick={handleUnsendMessage}
                                >
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