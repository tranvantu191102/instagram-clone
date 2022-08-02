import React, { useEffect, useState, useRef } from 'react';
import { collection, query, onSnapshot, limit, orderBy } from "firebase/firestore";
import { db } from '../../../firebase/config';
import { useSelector } from 'react-redux';

import Message from './Message';


const ChatContent = ({ user }) => {

    const userCurrent = useSelector(state => state.user.userData)
    const userActive = useSelector(state => state.conversation.userActive)
    const [conversation, setConversation] = useState([])
    const scrollRef = useRef(null)

    useEffect(() => {
        try {
            const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
            const conversationRef = collection(db, 'conversations', conversationId, 'content')
            const q = query(conversationRef, orderBy('time', 'asc', limit(20)))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const results = []
                querySnapshot.forEach(doc => {
                    results.push({ ...doc.data(), id: doc.id })
                })
                setConversation(results)
                return unsubscribe
            })
        } catch (error) {
            console.log(error)
        }

    }, [userActive])


    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            const element = scrollRef.current;
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth"
            })
        }
    }, [conversation])

    // console.log("conversation", conversation)


    return (
        <div className='h-[calc(100%-142px)] w-full overflow-y-auto scrollbar-hide'
            ref={scrollRef}
        >
            <div className="px-5">
                {
                    conversation && conversation.length > 0 && conversation.map((item, index) => (
                        <Message
                            user={user}
                            userCurrent={userCurrent}
                            message={item}
                            key={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatContent