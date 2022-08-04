import React, { useState, useRef, useEffect } from 'react'
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { editListUser } from '../../../redux/reducers/conversationReducer';
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db, storage } from '../../../firebase/config'
import { ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";

import loveImage from '../../../assets/images/chat/heart.png'
import fileImage from '../../../assets/images/chat/file.png'

const ChatFooter = ({ user }) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const emojiRef = useRef()
    const dispatch = useDispatch()
    const userCurrent = useSelector(state => state.user.userData)

    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji)
    };

    useEffect(() => {

    }, [])

    const handleOnchangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleOnFocusInput = () => {
        setShowEmoji(false)
    }

    const handleSendMessage = async () => {
        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = collection(db, 'conversations', conversationId, 'content')
        const lastMessage = doc(db, 'lastMessage', conversationId)
        if (message) {

            const data = {
                userAuth: userCurrent.id,
                user: user.id,
                message: message,
                like: false,
                time: serverTimestamp()
            }
            setMessage("")
            await addDoc(conversationRef, data)
            await setDoc(lastMessage, {
                ...data,
                commonId: [user.id, userCurrent.id]
            })

            dispatch(editListUser(user))
        }
    }


    const handleSendImage = async (file) => {
        const imageRef = ref(storage, `conversation/${new Date().getTime()}-${file.name}`)
        const lastMessage = doc(db, 'lastMessage', conversationId)
        const snap = await uploadBytes(imageRef, file)
        const photoURL = await getDownloadURL(ref(storage, snap.ref.fullPath))
        const photoPath = snap.ref.fullPath

        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = collection(db, 'conversations', conversationId, 'content')
        await addDoc(conversationRef, {
            userAuth: userCurrent.id,
            user: user.id,
            photoURL: photoURL,
            photoPath: photoPath,
            like: false,
            time: serverTimestamp()
        })

        await setDoc(lastMessage, {

            userAuth: userCurrent.id,
            user: user.id,
            message: 'Sent a message',
            like: false,
            time: serverTimestamp(),
            commonId: [user.id, userCurrent.id]
        })

        dispatch(editListUser(user))

    }

    const handleSendHeart = async () => {
        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = collection(db, 'conversations', conversationId, 'content')
        const lastMessage = doc(db, 'lastMessage', conversationId)

        await addDoc(conversationRef, {
            userAuth: userCurrent.id,
            user: user.id,
            message: 'heart-icon-ttt',
            like: false,
            time: serverTimestamp()
        })

        await setDoc(lastMessage, {

            userAuth: userCurrent.id,
            user: user.id,
            message: 'Sent a message',
            like: false,
            time: serverTimestamp(),
            commonId: [user.id, userCurrent.id]
        })

        dispatch(editListUser(user))

    }

    return (
        <div className='h-[84px] w-full p-5'>
            <div className='h-full flex items-center justify-between border-[1px] px-5 border-border-color rounded-2xl'>
                <div ref={emojiRef}
                    className="relative pr-5"
                >
                    <FontAwesomeIcon
                        icon={faFaceGrinBeam}
                        className='text-xl cursor-pointer text-gray-text'
                        onClick={() => setShowEmoji(!showEmoji)}
                    />
                    {
                        showEmoji &&
                        <div className="absolute bottom-[calc(100%+10px)] -left-5">
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    }
                </div>
                <input
                    type="text"
                    placeholder='Message...'
                    className='placeholder:text-base placeholder:text-primary-color focus:text-gray-color
                    flex-1 px-2 py-1 outline-none border-none text-base
                    '
                    value={message}
                    onChange={(e) => handleOnchangeMessage(e)}
                    onFocus={handleOnFocusInput}
                />
                {
                    message ?
                        <div className="">
                            <span className='text-base text-blue-text font-semibold cursor-pointer pl-5'
                                onClick={handleSendMessage}
                            >
                                Send
                            </span>
                        </div>
                        :
                        <div className="flex items-center justify-center">
                            <div className="mr-4 ">
                                <label htmlFor="file">
                                    <img
                                        src={fileImage}
                                        alt=""
                                        className='w-6 h-6 cursor-pointer'
                                    />
                                </label>
                                <input
                                    accept="image/jpeg,image/png,image/heic,image/heif"
                                    type="file" name="" id="file" hidden
                                    onChange={(e) => handleSendImage(e.target.files[0])}
                                />
                            </div>
                            <div className="cursor-pointer">
                                <img
                                    src={loveImage} alt=""
                                    className='w-6 h-6'
                                    onClick={handleSendHeart}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ChatFooter