import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../../firebase/config'
import { addUserActive } from '../../redux/reducers/conversationReducer'

import infoImage from '../../assets/images/chat/info.png'
import userImage from '../../assets/images/user.png'

const SettingConversation = ({ setShowSettingConversation, user }) => {

    const userCurrent = useSelector(state => state.user.userData)
    const dispatch = useDispatch()

    const handleDeleteChat = async () => {
        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = doc(db, 'conversations', conversationId)
        const lastMessageRef = doc(db, 'lastMessage', conversationId)
        await deleteDoc(conversationRef)
        await deleteDoc(lastMessageRef)
        dispatch(addUserActive({}))
        setShowSettingConversation(false)
    }

    return (
        <div className='flex-1 h-full border-l-[1px] border-border-color'>
            <div className="h-[58px] w-full border-b-[1px] border-border-color px-5 flex items-center justify-between">
                <div></div>
                <div className="">
                    <span>Details</span>
                </div>
                <div className="">
                    <img
                        src={infoImage}
                        alt=""
                        className='w-6 h-6 cursor-pointer'
                        onClick={() => setShowSettingConversation(false)}
                    />
                </div>
            </div>
            <div className="my-4 border-b-[1px] border-border-color py-4">
                <h4 className='px-4 mb-3 text-lg text-primary-text font-semibold'>Members</h4>
                <Link to={`/profile/${user.id}`}>
                    <div className="flex items-center justify-start px-4">
                        <img
                            src={user.photoURL || userImage}
                            alt=""
                            className='w-[56px] h-[56px] rounded-full mr-2'
                        />
                        <p className='text-lg text-primary-text font-semibold'>{user.fullname}</p>
                    </div>
                </Link>
            </div>
            <div className="px-4">
                <div className="w-full cursor-pointer"
                    onClick={handleDeleteChat}
                >
                    <span className='text-base text-red-color font-normal'>
                        Delete Chat
                    </span>
                </div>
                <div className="mt-4 w-full cursor-pointer">
                    <span className='text-base text-red-color font-normal'>
                        Block
                    </span>
                </div>
                <div className="mt-4 w-full cursor-pointer">
                    <span className='text-base text-red-color font-normal'>
                        Report
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SettingConversation