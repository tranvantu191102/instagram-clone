import React, { useEffect, useState } from 'react'
import { faChevronDown, faPenToSquare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { collection, query, orderBy, limit, where, onSnapshot, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'

import ListUser from './ListUser'
import Chat from './Chat/Chat'
import { show } from '../../redux/reducers/modalReducer'
import { refreshConversation } from '../../redux/reducers/conversationReducer'
import SkeletonUserChat from '../../components/Skeleton/SkeletonUserChat'

const Conversation = () => {

    const userCurrent = useSelector(state => state.user.userData)
    const userActive = useSelector(state => state.conversation.userActive)
    const listUser = useSelector(state => state.conversation.listUser)
    const [loading, setLoading] = useState(false)
    const [lastMessage, setLastMessage] = useState([])
    const [userChatted, setUserChatted] = useState([])

    const dispatch = useDispatch()


    const showModalAddConversation = () => {
        dispatch(show('MODAL_ADD_CONVERSATION'))
    }

    useEffect(() => {
        const handler = () => {
            dispatch(refreshConversation())
        }
        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)
        }

    }, [])

    useEffect(() => {
        try {
            const getLastMessage = async () => {
                setLoading(true)
                const q = query(collection(db, 'lastMessage'),
                    where('commonId', 'array-contains', userCurrent.id),
                    orderBy('time', 'asc'),
                    limit(10))

                const messages = []
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((data) => {
                    messages.push({ ...data.data(), id: data.id })
                })

                setLastMessage(messages)
            }

            getLastMessage()
        } catch (error) {
            console.log(error)
        }


    }, [listUser])

    useEffect(() => {

        const getUserChatted = async () => {
            try {
                if (lastMessage && lastMessage.length > 0) {
                    let users = []
                    setLoading(true)
                    for (let i = 0; i < lastMessage.length; i++) {
                        const id = lastMessage[i].userAuth === userCurrent.id ? lastMessage[i].user : lastMessage[i].userAuth
                        const docRef = doc(db, 'users', id)
                        const docSnap = await getDoc(docRef)
                        users.push({ ...docSnap.data(), lastMessage: lastMessage[i] })

                    }
                    setUserChatted(users.reverse())
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        getUserChatted()

    }, [lastMessage])


    return (
        <div className='mt-[60px] flex items-center justify-center bg-second-bg'>
            <div className='w-[935px] tab:w-[800px] h-[calc(100vh-100px)] flex justify-center items-start bg-primary-bg mt-5 border-[1px] border-border-color rounded'>
                <div className='w-[350px]'>
                    <div className='flex items-center justify-between px-4 py-2 border-b-[1px] border-border-color'>
                        <div></div>
                        <button>
                            <span className='text-lg text-primary-text font-semibold mr-2'>{userCurrent.username}</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                        <div className='text-xl p-1 cursor-pointer'
                            onClick={showModalAddConversation}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                    </div>
                    <div className='overflow-auto'>
                        {
                            loading ?
                                <>
                                    <SkeletonUserChat></SkeletonUserChat>
                                    <SkeletonUserChat></SkeletonUserChat>
                                    <SkeletonUserChat></SkeletonUserChat>
                                    <SkeletonUserChat></SkeletonUserChat>
                                    <SkeletonUserChat></SkeletonUserChat>
                                    <SkeletonUserChat></SkeletonUserChat>
                                    <SkeletonUserChat></SkeletonUserChat>
                                </>
                                :
                                <>
                                    <ListUser
                                        listUser={userChatted}
                                    />
                                    <ListUser
                                        listUser={listUser}
                                    />
                                </>
                        }
                    </div>
                </div>
                {
                    !_.isEmpty(userActive) ?
                        <Chat
                            user={userActive}
                        />
                        :
                        <div className='flex-1 h-full flex items-center justify-center flex-col border-l-[1px] border-border-color'>
                            <div className='py-7 px-8 border-2 border-primary-text rounded-full'>
                                <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
                            </div>
                            <h3 className='text-xl font-light text-primary-text mt-2'>Your Messages</h3>
                            <p className='text-base font-normal text-gray-text mt-2'>Send private photos and messages to a friend or group.</p>
                            <button className='p-2 rounded-lg mt-4 text-white-text font-semibold bg-blue-text'
                                onClick={showModalAddConversation}
                            >
                                Send Message
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Conversation