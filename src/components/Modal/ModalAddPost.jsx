import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useSelector, useDispatch } from 'react-redux';
import { db, storage } from '../../firebase/config'
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faFolderPlus, faLocationDot, faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons'
import Picker from 'emoji-picker-react';

import { hide } from '../../redux/reducers/modalReducer';
import Modal from '../Modal/Modal'
import Image from '../../assets/images/image.png'

import userImage from '../../assets/images/user.png'
const ModalAddPost = () => {


    const [imagePost, setImagePost] = useState([])
    const [activeIndex, setActiveIndex] = useState(1)
    const [caption, setCaption] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const [loading, setLoading] = useState(false)
    const emojiRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userData)

    const handleOnChangeInput = (e) => {
        const file = e.target.files[0]
        const objectUrl = URL.createObjectURL(file)
        setImagePost([...imagePost, {
            file,
            objectUrl
        }])

        setActiveIndex(2)
    }

    const handleAddImage = (e) => {
        const file = e.target.files[0]
        const objectUrl = URL.createObjectURL(file)
        setImagePost([...imagePost, {
            file,
            objectUrl
        }])

    }

    const handleOnChangeCaption = (e) => {
        setCaption(e.target.value)
    }

    const onEmojiClick = (event, emojiObject) => {
        setCaption(caption + emojiObject.emoji)
    };


    const handleSavePost = async () => {
        setLoading(true)
        let arrImg = []
        if (imagePost) {
            for (let i = 0; i < imagePost.length; i++) {
                const imageRef = ref(storage, `posts/${new Date().getTime()}-${imagePost[i].file.name}`)
                const snap = await uploadBytes(imageRef, imagePost[i].file)
                const photoURL = await getDownloadURL(ref(storage, snap.ref.fullPath))
                const photoPath = snap.ref.fullPath
                arrImg = [...arrImg, { photoPath, photoURL }]
            }
        }

        const postRef = collection(db, 'posts')
        await addDoc(postRef, {
            caption,
            arrImg,
            userId: user.id,
            like: [],
            timestamp: serverTimestamp()
        })

        await updateDoc(doc(db, 'users', user.id), {
            ...user,
            posts: user.posts + 1
        })

        setLoading(false)
        setCaption("")
        setImagePost([])
        dispatch(hide('MODAL_ADD_POST'))
    }

    return (
        <Modal>
            <div className='w-[770px] bg-primary-bg rounded-lg'>

                <div className={`border-b-[1px] border-border-color px-2 py-2 flex items-center justify-between`}>
                    {
                        <FontAwesomeIcon icon={faArrowLeftLong} className="cursor-pointer" />
                    }
                    <h2 className='text-center text-lg text-black font-semibold'>
                        Create new post
                    </h2>

                    <span className='text-base text-blue-text font-bold cursor-pointer'
                        onClick={() => handleSavePost()}
                    >{loading ?
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            <FontAwesomeIcon icon={faSpinner} />
                        </svg>
                        : 'Share'}
                    </span>

                </div>
                <div className='flex items-start justify-start'>
                    <div className='h-[424px] w-[424px] overflow-auto border-r-[1px] border-border-color'>
                        {
                            activeIndex === 1 &&
                            <div className='flex items-center justify-center h-full flex-col'>
                                <img
                                    src={Image}
                                    alt=""
                                    className='w-[96px] h-[96px] mb-4'
                                />
                                <span className='text-xl text-primary-text font-light mb-4'>Drag photos and videos here</span>
                                <div>
                                    <label
                                        htmlFor="input"
                                        className='text-base text-white-text cursor-pointer font-semibold px-2 py-2 bg-blue-text rounded'
                                    >
                                        Select from computer
                                    </label>
                                    <input
                                        accept="image/jpeg,image/png,image/heic,image/heif"
                                        type="file"
                                        hidden id='input'
                                        onChange={(e) => handleOnChangeInput(e)}
                                    />
                                </div>
                            </div>
                        }
                        {
                            activeIndex === 2 &&
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
                                                        className='bg-center bg-no-repeat bg-cover h-[424px] w-[424px] overflow-hidden
                                                    rounded-b-lg
                                                '
                                                        style={{ backgroundImage: `url(${item.objectUrl})` }}
                                                    ></div>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    <div className='absolute bottom-1 cursor-pointer right-1 py-1 px-2 z-[99] bg-black rounded-full hover:opacity-60'>
                                        <label htmlFor="image-input" className='cursor-pointer'>
                                            <FontAwesomeIcon icon={faFolderPlus} className="text-lg text-white-text" />
                                        </label>
                                        <input
                                            type="file"
                                            hidden id='image-input'
                                            onChange={(e) => handleAddImage(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        }



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
                            className='text-lg text-primary-text font-light pl-2 pr-4 w-full outline-none min-h-[168px]'
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
        </Modal>
    )
}

export default ModalAddPost