import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Picker from 'emoji-picker-react';

import Modal from '../Modal/Modal'
import getTime from '../../utils/getTime';

import userImage from '../../assets/images/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faHeart as faHeartSolid,
    faBookmark as faBMSolid
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment, faPaperPlane, faBookmark, faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons';

const PostModalCard = () => {

    const post = useSelector(state => state.post.postCard)
    const user = useSelector(state => state.user.userData)
    const [showEmoji, setShowEmoji] = useState(false)
    const inputRef = useRef()
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [comment, setComment] = useState("")

    console.log(post)
    // console.log(user)
    const onEmojiClick = (event, emojiObject) => {
        setComment(comment + emojiObject.emoji)
    };

    const handleFocusComment = () => {
        inputRef.current.focus()
    }


    return (
        <Modal>
            <div className='flex items-start justify-center w-[1000px] bg-primary-bg z-[999] rounded-lg'>
                <div className='w-1/2'>
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    >
                        {
                            post && post.arrImg && post.arrImg.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className='bg-center bg-no-repeat bg-cover h-[80vh] w-[500px] 
                                                    rounded-bl-lg  rounded-tl-lg 
                                                '
                                        style={{ backgroundImage: `url(${item.photoURL})` }}
                                    ></div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className='w-1/2 bg-primary-bg flex flex-col'>
                    <div className='flex items-center justify-between px-3 py-3 border-b-[1px] border-border-color'>
                        <div className='flex items-center justify-center'>
                            <img src={user.photoURL || userImage} alt="" className='w-8 h-8 rounded-full mr-4' />
                            <span className='text-base text-primary-text font-semibold'>{user.username}</span>
                        </div>
                        <div className='p-2 cursor-pointer'>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </div>
                    <div className='h-[calc(80vh-212px)] overflow-y-auto scrollbar-hide'>
                        <div className='flex items-center justify-start px-3 py-3'>
                            <img
                                src={user.photoURL || userImage} alt=""
                                className='w-8 h-8 rounded-full mr-4'
                            />
                            <p className='text-base text-primary-text font-normal leading-tight'>
                                <span className='text-base text-primary-text font-semibold mr-2 '>{user.username}</span>{post.caption}
                            </p>
                        </div>
                        <div className='h-[500px]'></div>
                    </div>
                    <div className='flex items-center justify-between px-3 pt-3 pb-2 border-t-[1px] border-border-color'>
                        <div className='flex items-center justify-center'>
                            <div
                                onClick={() => setLiked(!liked)}
                                className="text-xl cursor-pointer hover:opacity-50 mr-4"
                            >
                                {liked ?
                                    <FontAwesomeIcon icon={faHeartSolid} className="text-red-color" />
                                    :
                                    <FontAwesomeIcon icon={faHeart} />}
                            </div>
                            <div className='text-xl hover:opacity-50 cursor-pointer mr-4'
                                onClick={handleFocusComment}
                            >
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <div className='text-xl hover:opacity-50 cursor-pointer'>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </div>
                        </div>
                        <div className='text-xl hover:opacity-50 cursor-pointer'
                            onClick={() => setSaved(!saved)}
                        >
                            {
                                saved ?
                                    <FontAwesomeIcon icon={faBMSolid} />
                                    :
                                    <FontAwesomeIcon icon={faBookmark} />
                            }
                        </div>
                    </div>
                    <div className='px-3'>
                        <span className='text-base text-primary-text font-semibold'>
                            {
                                post.like > 1 ? `${post.like.length} likes` : `${post.like.length} like`
                            }
                        </span>
                    </div>
                    <span className='text-[10px] text-gray-text font-normal px-3'>
                        {getTime(post.timestamp.seconds, post.timestamp.nanoseconds)}
                    </span>
                    <div className='flex items-center relative justify-between px-3 pt-2 border-t-[1px] border-border-color'>
                        <div className='px-4 text-xl cursor-pointer'>
                            {
                                showEmoji &&
                                <div className='absolute bottom-12 left-3 transform z-[999]'>
                                    <Picker
                                        onEmojiClick={onEmojiClick}
                                    />
                                </div>
                            }
                            <FontAwesomeIcon icon={faFaceGrinBeam} onClick={() => setShowEmoji(!showEmoji)} />
                        </div>
                        <div className='flex-1 relative'>
                            {!comment &&
                                <label
                                    htmlFor="comment"
                                    className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none
                                text-base text-gray-text font-normal
                            '
                                >
                                    Add a comment...
                                </label>
                            }
                            <input
                                ref={inputRef}
                                type="text" id="comment"
                                className='w-full h-full p-3 outline-none text-base text-primary-text font-normal'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onFocus={() => setShowEmoji(false)}
                            />
                        </div>
                        <button className={`text-lg text-blue-text font-semibold p-2 ${!comment && 'opacity-50 pointer-events-none'}`}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PostModalCard