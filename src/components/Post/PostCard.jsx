import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc, onSnapshot, setDoc, query, collection, where, arrayRemove, arrayUnion } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faBookmark, faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import _ from 'lodash'
import Picker from 'emoji-picker-react';


import getTime from '../../utils/getTime'
import { db } from '../../firebase/config';


const PostCard = (props) => {


    const [post, setPost] = useState(props.post)
    const [user, setUser] = useState({})
    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState("")
    const [saved, setSaved] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const emojiRef = useRef(null)
    const emojiIConRef = useRef(null)
    const commentRef = useRef(null)


    useEffect(() => {
        const getInfoUser = async () => {
            if (post && !_.isEmpty(post)) {
                const userRef = doc(db, 'users', post.userId)
                const docSnap = await getDoc(userRef)
                if (docSnap) {
                    setUser(docSnap.data())
                }
            }
        }

        getInfoUser()
    }, [props.post])

    useEffect(() => {
        const handler = (e) => {

            if (emojiRef && emojiRef.current) {
                if (e.target === emojiIConRef.current) {
                    return
                }
                if (!emojiRef.current.contains(e.target)) {
                    setShowEmoji(false)
                }
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    useEffect(() => {
        const getPostUpdate = () => {
            const postRef = doc(db, 'posts', post.postId)
            onSnapshot(postRef, (doc) => {
                const res = doc.data()
                if (res) {
                    res.like.forEach((id) => {
                        setLiked(id === user.id ? true : false)
                    })
                }
            })
        }

        getPostUpdate()
    }, [liked])


    const onEmojiClick = (event, emojiObject) => {
        setComment(comment + emojiObject.emoji)
    };

    const handleFocusComment = () => {
        commentRef.current.focus()
    }

    console.log(post)
    const handleLikePost = async () => {
        setLiked(!liked)
        const q = query(collection(db, 'posts', where('postId', '==', post.postId)))
        console.log(q)
        try {
            if (!liked) {
                await setDoc(q, {
                    ...post,
                    like: post.like.filter(id => id !== user.id)
                })
            } else {
                await setDoc(q, {
                    ...post,
                    like: [...post.like, user.id]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        user && !_.isEmpty(user) &&
        <div className='bg-primary-bg rounded-lg border-[1px] border-gray-bg mt-4'>
            <div className='pl-3 py-2 flex items-center justify-between'>
                <div className='flex items-center justify-center'>
                    <img
                        src={user.photoURL}
                        alt=""
                        className='w-8 h-8 rounded-full'
                    />
                    <p className='ml-2 text-primary-text text-base font-semibold'>{user.username}</p>
                </div>
                <div className='pr-4 text-base cursor-pointer'>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            <div>
                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                >
                    {
                        post.arrImg.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='bg-center bg-no-repeat bg-cover min-h-[470px]'
                                    style={{ backgroundImage: `url(${item.photoURL})` }}
                                >

                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='flex items-center justify-between px-2 mt-1'>
                <div className='flex items-center justify-center'>
                    <div className='p-2 text-xl cursor-pointer hover:text-gray-text '
                        onClick={handleLikePost}
                    >
                        {
                            liked ? <FontAwesomeIcon icon={faHeartSolid} className="text-red-500" />
                                : <FontAwesomeIcon icon={faHeart} />
                        }
                    </div>
                    <div className='p-2  text-xl cursor-pointer hover:text-gray-text'
                        onClick={handleFocusComment}
                    >
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className='p-2 text-xl cursor-pointer hover:text-gray-text'>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                </div>
                <div className='p-2 text-xl cursor-pointer hover:text-gray-text'
                    onClick={() => setSaved(!saved)}
                >

                    {
                        saved ? <FontAwesomeIcon icon={faBookmarkSolid} />
                            : <FontAwesomeIcon icon={faBookmark} />
                    }
                </div>
            </div>
            <p className='px-4 text-primary-text font-semibold text-base'>
                {post.like && post.like.length > 1 ? `${post.like.length} likes` : `${post.like.length} like`}
            </p>
            <div className='px-4'>
                <span className='text-base font-bold text-primary-text mr-1 hover:underline cursor-pointer'>{user.username}</span>
                <span className='text-base font-normal text-primary-text'>{post.caption}</span>
            </div>
            <p className='px-4 my-1 text-[10px] uppercase font-normal text-gray-text'>{getTime(post.timestamp.seconds, post.timestamp.nanoseconds)}</p>
            <div className='flex items-center justify-between px-4 py-2 border-t-[1px] border-gray-bg'>
                <div className='relative'>
                    {
                        showEmoji &&
                        <div className='absolute bottom-10 -left-4 z-[999]' ref={emojiRef}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    }
                    <div className='px-4 text-xl cursor-pointer'
                        onClick={() => setShowEmoji(!showEmoji)}
                        ref={emojiIConRef}
                    >
                        <FontAwesomeIcon icon={faFaceGrinBeam} className="pointer-events-none" />
                    </div>
                </div>
                <input
                    ref={commentRef}
                    type="text"
                    placeholder='Add a comment...'
                    value={comment}
                    className='flex-1 outline-none text-base text-primary-text font-normal'
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className={`cursor-pointer px-2 outline-none text-blue-text font-semibold ${!comment ? 'opacity-50 pointer-events-none' : ''}`}
                    disabled={comment ? false : true}
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default PostCard