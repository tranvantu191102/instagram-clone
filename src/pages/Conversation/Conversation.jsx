import React from 'react'
import { faChevronDown, faPenToSquare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import ListUser from './ListUser'
import Chat from './Chat/Chat'
import { show } from '../../redux/reducers/modalReducer'

const Conversation = () => {

    const userCurrent = useSelector(state => state.user.userData)
    const userActive = useSelector(state => state.conversation.userActive)
    const dispatch = useDispatch()


    const showModalAddConversation = () => {
        dispatch(show('MODAL_ADD_CONVERSATION'))
    }

    return (
        <div className='mt-[60px] flex items-center justify-center bg-second-bg'>
            <div className='w-[935px] h-[calc(100vh-100px)] flex justify-center items-start bg-primary-bg mt-5 border-[1px] border-gray-bg rounded'>
                <div className='w-[350px] border-r-[1px] border-gray-bg'>
                    <div className='flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-bg'>
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
                    <div>
                        <ListUser
                            userCurrent={userCurrent}
                        />
                    </div>
                </div>
                {
                    !_.isEmpty(userActive) ?
                        <Chat
                            user={userActive}
                        />
                        :
                        <div className='flex-1 h-full flex items-center justify-center flex-col'>
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