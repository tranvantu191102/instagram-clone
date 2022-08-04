import React, { useEffect, useState, useRef } from 'react';
import { collection, query, onSnapshot, limitToLast, orderBy } from "firebase/firestore";
import { db } from '../../../firebase/config';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Message from './Message';


const ChatContent = ({ user }) => {

    const userCurrent = useSelector(state => state.user.userData)
    const userActive = useSelector(state => state.conversation.userActive)
    const [limitCount, setLimitCount] = useState(10)
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
    const scrollBottomRef = useRef(null)

    useEffect(() => {
        scrollBottomRef.current?.scrollIntoView()
        setLimitCount(10)

        setTimeout(() => {
            scrollBottomRef.current?.scrollIntoView()
        }, 500);
    }, [userActive])

    useEffect(() => {
        try {
            setLoading(true)
            const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
            const conversationRef = collection(db, 'conversations', conversationId, 'content')
            const q = query(conversationRef, orderBy('time'), limitToLast(limitCount))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const results = []
                querySnapshot.forEach(doc => {
                    results.push({ ...doc.data(), id: doc.id })
                })
                setConversation(results)
                setLoading(false)
            })
            return unsubscribe
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }, [userActive, limitCount])

    const handleScrollConversation = (e) => {

        const { scrollTop } = e.currentTarget
        if (limitCount > conversation.length + 10) return
        if (scrollTop < 20) {
            setLimitCount((prev) => prev + 10)
        }

    }



    return (
        <div className='h-[calc(100%-142px)] w-full overflow-y-auto scrollbar-hide'
            onScroll={(e) => handleScrollConversation(e)}
        >
            <div className="px-5" >
                {loading &&
                    <div className='w-full flex items-center justify-center'>
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            <FontAwesomeIcon icon={faSpinner} />
                        </svg>
                    </div>}
                {
                    conversation && conversation.length > 0 && conversation.map((item, index) => (
                        <div className="" key={index}>
                            <Message
                                user={user}
                                userCurrent={userCurrent}
                                message={item}
                            />
                        </div>
                    ))
                }

            </div>
            <div ref={scrollBottomRef} ></div>
        </div>
    )
}

export default ChatContent