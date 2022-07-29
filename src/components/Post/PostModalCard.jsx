import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPostCard } from '../../redux/reducers/postReducer';
import { onSnapshot, collection, query, doc, setDoc, getDoc, orderBy } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from 'lodash'

import Modal from '../Modal/Modal'
import getTime from '../../utils/getTime';
import configTimeComment from '../../utils/configTimeComment';

import userImage from '../../assets/images/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faHeart as faHeartSolid,
    faBookmark as faBMSolid
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment, faPaperPlane, faBookmark } from '@fortawesome/free-regular-svg-icons';
import Comment from './Comment';
import ModalSettingComment from '../Modal/ModalSettingComment';
import OptionPostCardAuth from './OptionPostCardAuth';
import OptionPostCardUser from './OptionPostCardUser';
import ModalEditPost from '../Modal/ModalEditPost';

const PostModalCard = () => {

    const post = useSelector(state => state.post.postCard)
    const user = useSelector(state => state.user.userData)
    const [userPost, setUserPost] = useState({})
    const [focusComment, setFocusComment] = useState(false)
    const [isShowModalSettingComment, setIsShowModalSettingComment] = useState(false)
    const [showOptionPostCard, setShowOptionPostCard] = useState(false)
    const [showEditPost, setShowEditPost] = useState(false)
    const [comments, setComments] = useState([])
    const dispatch = useDispatch()
    const toggleRef = useRef(null)
    const optionRef = useRef(null)
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [comment, setComment] = useState("")

    useEffect(() => {
        const getInfoUser = async () => {
            if (post && !_.isEmpty(post)) {
                const userRef = doc(db, 'users', post.userId)
                const docSnap = await getDoc(userRef)
                const userLiked = post.like.filter(id => id === docSnap.id)
                if (userLiked.length > 0) {
                    setLiked(true)
                }
                if (docSnap) {
                    setUserPost(docSnap.data())
                }
            }
        }

        getInfoUser()
    }, [])


    const handleFocusComment = () => {
        setFocusComment(true)
    }

    useEffect(() => {
        const userLiked = post.like.filter(id => id === user.id)
        if (userLiked.length > 0) {
            setLiked(true)
        }
    }, [post])

    useEffect(() => {
        const q = query(collection(db, "comments", post.id, "content"), orderBy('time'));
        const unsub = onSnapshot(q,
            (querySnapshot) => {
                const results = [];
                if (!querySnapshot.metadata.hasPendingWrites) {
                    querySnapshot.forEach((doc) => {
                        results.push({ ...doc.data(), id: doc.id })
                    });
                    setComments(results)
                }
            })

        return unsub
    }, [])

    const handleLikePost = async () => {
        setLiked(!liked)
        const postRef = doc(db, 'posts', post.id)
        try {
            if (liked) {
                dispatch(addPostCard({
                    ...post,
                    like: post.like.filter(id => id !== user.id)
                }))
                await setDoc(postRef, {
                    ...post,
                    like: post.like.filter(id => id !== user.id)
                })
            } else {
                dispatch(addPostCard({
                    ...post,
                    like: [...post.like, user.id]
                }))
                await setDoc(postRef, {
                    ...post,
                    like: [...post.like, user.id]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLikeComments = async (item) => {
        const commentRef = doc(db, 'comments', post.id, 'content', item.id)
        try {
            const indexComment = item.like.indexOf(user.id)
            if (indexComment !== -1) {
                await setDoc(commentRef, {
                    ...item,
                    like: item.like.filter(id => id !== user.id)
                })
            } else {
                await setDoc(commentRef, {
                    ...item,
                    like: [...item.like, user.id]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReplyComment = (commentItem) => {
        const userReply = `@${commentItem.username} `
        setComment(userReply)
        setFocusComment(true)
    }

    const handleSettingComment = () => {
        setIsShowModalSettingComment(true)
    }


    return (
        <>
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
                                <img src={userPost.photoURL || userImage} alt="" className='w-8 h-8 rounded-full mr-4' />
                                <span className='text-base text-primary-text font-semibold'>{userPost.username}</span>
                            </div>
                            <div className='p-2 cursor-pointer'
                                onClick={() => setShowOptionPostCard(true)}
                                ref={optionRef}
                            >
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </div>
                        <div className='h-[calc(80vh-212px)] overflow-y-auto scrollbar-hide'>
                            <div className='flex items-start justify-start px-3 py-3 '>
                                <img
                                    src={userPost.photoURL || userImage} alt=""
                                    className='w-8 h-8 rounded-full mr-4'
                                />
                                <p className='text-base text-primary-text font-normal leading-tight mt-2'>
                                    <span className='text-base text-primary-text font-semibold mr-2 '>{userPost.username}</span>{post.caption}
                                </p>
                            </div>
                            {
                                comments && comments.length > 0 &&
                                comments.map((item, index) => (
                                    <div className='flex items-start justify-between px-3 py-3' key={index}>
                                        <div className='flex items-start justify-start '>
                                            <img
                                                src={item.userPhotoURL || userImage} alt=""
                                                className='w-8 h-8 rounded-full mr-4'
                                            />
                                            <div className=''>
                                                <p className='text-base text-primary-text font-normal leading-tight mt-2 '>
                                                    <span className='text-base text-primary-text font-semibold mr-2 '>{item.username}</span>{item.comment}
                                                </p>
                                                <div className="group flex items-center justify-start mt-1 ">
                                                    <div className=''>
                                                        <span className='text-sm text-gray-text font-normal mr-4 cursor-pointer'>
                                                            {configTimeComment(item.time.seconds, item.time.nanoseconds)}
                                                        </span>
                                                        <span className='text-sm text-gray-text font-normal mr-4 cursor-pointer'>
                                                            {`${item.like.length} ${item.like.length < 2 ? 'like' : 'likes'}`}
                                                        </span>
                                                        <span className='text-sm text-gray-text font-normal mr-4 cursor-pointer'
                                                            onClick={() => handleReplyComment(item)}
                                                        >
                                                            Reply
                                                        </span>
                                                    </div>
                                                    <div className='hidden group-hover:inline-block cursor-pointer text-gray-text'
                                                        onClick={handleSettingComment}
                                                        ref={toggleRef}
                                                    >
                                                        <FontAwesomeIcon icon={faEllipsis} className="text-sm" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=''
                                            onClick={() => handleLikeComments(item)}
                                        >
                                            {
                                                item.like.indexOf(user.id) !== -1 ?
                                                    <FontAwesomeIcon icon={faHeartSolid} className="text-red-color text-sm cursor-pointer" />
                                                    :
                                                    <FontAwesomeIcon icon={faHeart} className="text-sm cursor-pointer" />
                                            }

                                        </div>
                                    </div>
                                ))
                            }
                            {/* <div className='h-[500px]'></div> */}
                        </div>
                        <div className='flex items-center justify-between px-3 pt-3 pb-2 border-t-[1px] border-border-color'>
                            <div className='flex items-center justify-center'>
                                <div
                                    onClick={handleLikePost}
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
                        <Comment
                            focusComment={focusComment}
                            postId={post.id}
                            userId={user.id}
                            username={user.username}
                            userPhotoURL={user.photoURL}
                            commentReply={comment}
                        />
                    </div>
                </div>

            </Modal>
            {
                isShowModalSettingComment &&
                <ModalSettingComment
                    setModal={setIsShowModalSettingComment}
                    toggleRef={toggleRef}
                />
            }
            {
                showOptionPostCard && userPost.id === user.id &&
                <OptionPostCardAuth
                    setShowOptionPostCard={setShowOptionPostCard}
                    post={post}
                    user={user}
                    setShowEditPost={setShowEditPost}
                />
            }{
                showOptionPostCard && userPost.id !== user.id && <OptionPostCardUser
                    setShowOptionPostCard={setShowOptionPostCard}
                    post={post}
                    user={user}
                />
            }
            {
                showEditPost && <ModalEditPost
                    post={post}
                    setShowEditPost={setShowEditPost}
                />
            }
        </>
    )
}

export default PostModalCard