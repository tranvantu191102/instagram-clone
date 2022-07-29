import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faLocationDot, faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons'
import Picker from 'emoji-picker-react';

import { addPostCard } from '../../redux/reducers/postReducer';

import userImage from '../../assets/images/user.png'
const ModalEditPost = ({ post, setShowEditPost }) => {

    const [imagePost, setImagePost] = useState(post.arrImg)
    const [caption, setCaption] = useState(post.caption)
    const [showEmoji, setShowEmoji] = useState(false)
    const [loading, setLoading] = useState(false)
    const emojiRef = useRef()
    const contentRef = useRef(null)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userData)


    useEffect(() => {
        const handler = (event) => {
            if (!contentRef.current.contains(event.target)) {
                setShowEditPost(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])


    const handleOnChangeCaption = (e) => {
        setCaption(e.target.value)
    }

    const onEmojiClick = (event, emojiObject) => {
        setCaption(caption + emojiObject.emoji)
    };


    const handleSavePost = async () => {
        setLoading(true)

        const postRef = doc(db, 'posts', post.id)
        await updateDoc(postRef, {
            caption,
        })

        dispatch(addPostCard({ ...post, caption }))
        setLoading(false)
        setCaption("")
        setShowEditPost(false)
    }

    return (
        <div className='fixed inset-0 w-full h-full z-[9999] bg-[rgba(0,0,0,0.65)]'>
            <div
                className='w-[770px] bg-primary-bg rounded-lg absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                ref={contentRef}
            >

                <div className={`border-b-[1px] border-border-color px-2 py-2 flex items-center justify-between`}>
                    {
                        <FontAwesomeIcon icon={faArrowLeftLong} className="cursor-pointer" />
                    }
                    <h2 className='text-center text-lg text-black font-semibold'>
                        Edit post
                    </h2>

                    <span className='text-base text-blue-text font-bold cursor-pointer'
                        onClick={() => handleSavePost()}
                    >{loading ?
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            <FontAwesomeIcon icon={faSpinner} />
                        </svg>
                        : 'Done'}
                    </span>

                </div>
                <div className='flex items-start justify-start'>
                    <div className='h-[424px] w-[424px] overflow-auto border-r-[1px] border-border-color'>
                        <div className='flex items-start justify-center w-full h-full'>
                            <div className='relative w-full h-full'>
                                <Swiper
                                    cssMode={true}
                                    navigation={true}
                                    pagination={true}
                                    mousewheel={true}
                                    keyboard={true}
                                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                >
                                    {
                                        imagePost.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className='bg-center bg-no-repeat bg-cover h-[424px] w-[424px] overflow-hidden m-0
                                                    rounded-b-lg
                                                '
                                                    style={{ backgroundImage: `url(${item.objectUrl || item.photoURL})` }}
                                                ></div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>

                    </div>
                    <div className='w-[340px] h-[424px] overflow-auto'>
                        <div className='flex items-center justify-start my-4 px-2'>
                            <img
                                src={user.photoURL || userImage}
                                alt=""
                                className='w-[28px] h-[28px] rounded-full mr-4 '
                            />
                            <p className='text-lg text-primary-text font-semibold'>{user.username}</p>
                        </div>
                        <textarea
                            placeholder='Write a caption...'
                            value={caption}
                            className='text-lg resize-none text-primary-text font-light pl-2 pr-4 w-full outline-none min-h-[168px]'
                            onChange={(e) => handleOnChangeCaption(e)}
                            onFocus={() => setShowEmoji(false)}
                        >
                        </textarea>
                        <div className='flex items-center justify-between px-2' >
                            <div ref={emojiRef}>
                                <FontAwesomeIcon
                                    icon={faFaceGrinBeam}
                                    className='text-xl cursor-pointer text-gray-text'
                                    onClick={() => setShowEmoji(!showEmoji)}
                                />
                                {
                                    showEmoji && <Picker onEmojiClick={onEmojiClick} />
                                }
                            </div>
                            <span className='text-sm text-gray-text font-normal'>1/2200</span>
                        </div>
                        <div className='flex items-center justify-between px-2 py-3 border-t-[1px] border-b-[1px] border-border-color'>
                            <span className='text-lg text-primary-text font-normal'>Add location</span>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <div className='flex items-center justify-between px-2 py-3  border-b-[1px] border-border-color'>
                            <span className='text-lg text-primary-text font-normal'>Accessibility</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <div className='flex items-center justify-between px-2 py-3  border-b-[1px] border-border-color'>
                            <span className='text-lg text-primary-text font-normal'>Advanced settings</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditPost