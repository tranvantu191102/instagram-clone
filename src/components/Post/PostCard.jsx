import React, { useState, useEffect } from 'react'
import { doc, getDoc, onSnapshot, setDoc, collection, where, query } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../../redux/reducers/modalReducer'
import { addPostCard } from '../../redux/reducers/postReducer'


import getTime from '../../utils/getTime'
import { db } from '../../firebase/config';
import Comment from './Comment';
import OptionPostCardUser from './OptionPostCardUser';


const PostCard = (props) => {

    const [post, setPost] = useState(props.post)
    const userCurrent = useSelector(state => state.user.userData)
    const [user, setUser] = useState({})
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [showOptionPostCard, setShowOptionPostCard] = useState(false)
    const [comments, setComments] = useState([])
    const [focusComment, setFocusComment] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        const getInfoUser = async () => {
            if (post && !_.isEmpty(post)) {
                const userRef = doc(db, 'users', post.userId)
                const docSnap = await getDoc(userRef)
                const userLiked = post.like.filter(id => id === userCurrent.id)
                if (userLiked.length === 1) {
                    setLiked(true)
                }
                if (docSnap) {
                    setUser(docSnap.data())
                }
            }
        }

        getInfoUser()
    }, [props.post])


    useEffect(() => {

        const postRef = doc(db, 'posts', post.id)
        const unsub = onSnapshot(postRef, (doc) => {
            const res = { ...doc.data(), id: doc.id }
            setPost(res)
        })

        return unsub
    }, [liked])

    useEffect(() => {

        const q = query(collection(db, "comments", post.id, 'content'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            });
            setComments(results)
        })

        return unsub
    }, [])



    const handleLikePost = async () => {
        setLiked(!liked)
        const postRef = doc(db, 'posts', post.id)
        try {
            if (liked) {
                await setDoc(postRef, {
                    ...post,
                    like: post.like.filter(id => id !== userCurrent.id)
                })
            } else {
                await setDoc(postRef, {
                    ...post,
                    like: [...post.like, userCurrent.id]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFocusComment = () => {
        setFocusComment(true)
    }

    const handleShowPostModal = () => {
        dispatch(addPostCard(post))
        dispatch(show('MODAL_POST'))
    }

    const handleShowOption = () => {
        setShowOptionPostCard(true)
    }


    return (
        user && !_.isEmpty(user) &&
        <>
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
                    <div className='pr-4 text-base cursor-pointer'
                        onClick={handleShowOption}
                    >
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
                    <p className={`text-base font-normal text-primary-text text-two-line`}>
                        {post.caption}
                    </p>
                </div>
                <div className="">
                    <span className='text-base font-normal text-gray-text px-4 cursor-pointer'
                        onClick={handleShowPostModal}
                    >
                        {
                            comments.length > 0 && `View all ${comments.length} ${comments.length < 2 ? 'comment' : 'comments'} `
                        }
                    </span>
                </div>
                <p className='px-4 my-1 text-[10px] uppercase font-normal text-gray-text'>{getTime(post.timestamp.seconds, post.timestamp.nanoseconds)}</p>
                <Comment
                    focusComment={focusComment}
                    postId={post.id}
                    userId={userCurrent.id}
                    username={userCurrent.username}
                    userPhotoURL={userCurrent.photoURL}
                />
            </div>
            {
                showOptionPostCard &&
                <OptionPostCardUser
                    setShowOptionPostCard={setShowOptionPostCard}
                    post={post}
                    user={user}
                />
            }
        </>
    )
}

export default PostCard