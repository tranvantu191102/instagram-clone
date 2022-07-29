import React, { useState, useEffect, useRef } from 'react'
import Picker from 'emoji-picker-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinBeam } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ focusComment, postId, userId, username, userPhotoURL, commentReply }) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const emojiRef = useRef(null)
    const emojiIConRef = useRef(null)
    const commentRef = useRef(null)

    const onEmojiClick = (event, emojiObject) => {
        setComment(comment + emojiObject.emoji)
    };

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
        if (focusComment) {
            commentRef.current.focus()
        }
        if (commentReply) {
            setComment(commentReply)
        }
    }, [focusComment, commentReply])

    const handlePostComment = async () => {
        try {
            setLoading(true)
            const commentRef = collection(db, 'comments', postId, 'content')
            await addDoc(commentRef, {
                comment,
                like: [],
                postId,
                userId,
                username,
                userPhotoURL,
                time: serverTimestamp()
            })
            setComment("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (
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
                onClick={handlePostComment}
            >
                {
                    loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        <FontAwesomeIcon icon={faSpinner} />
                    </svg> : <span>Post</span>
                }
            </button>
        </div>
    )
}

export default Comment