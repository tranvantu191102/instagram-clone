import React from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { hide } from '../../redux/reducers/modalReducer'
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

const ModalUnsendMessage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.conversation.userActive)
    const userCurrent = useSelector(state => state.user.userData)
    const messageId = useSelector(state => state.conversation.messageId)

    const handleCancel = () => {
        dispatch(hide())
    }

    const handleUnsendMessage = async () => {
        const conversationId = user.id > userCurrent.id ? `${user.id + userCurrent.id}` : `${userCurrent.id + user.id}`
        const conversationRef = doc(db, 'conversations', conversationId, 'content', messageId)
        const lastMessage = doc(db, 'lastMessage', conversationId)
        await deleteDoc(conversationRef)

        await updateDoc(lastMessage, {
            message: 'Unsend a message'
        })
        dispatch(hide())
    }
    return (
        <Modal>
            <div className="w-[400px] bg-primary-bg rounded-lg">
                <div className="text-center px-10">
                    <h3 className='text-2lg text-primary-text font-bold pt-5'>Unsend Message?</h3>
                    <p className='text-base text-gray-text font-normal'>
                        Unsending will remove the message for everyone. People may have seen it already.
                    </p>
                </div>
                <div className="">
                    <div className='py-2 border-y-[1px] border-border-color cursor-pointer mt-5'>
                        <p className='w-full block py-2 text-center text-red-color font-bold text-base'
                            onClick={handleUnsendMessage}
                        >
                            Unsend
                        </p>
                    </div>
                </div>
                <div className='py-2 cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'
                        onClick={handleCancel}
                    >
                        Cancel
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default ModalUnsendMessage