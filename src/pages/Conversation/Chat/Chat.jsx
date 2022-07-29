import React from 'react'


import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter'
import ChatContent from './ChatContent'

const Chat = ({ user }) => {
    return (
        <div className='flex-1 h-full flex items-center justify-center flex-col border-l-[1px] border-border-color'>
            <ChatHeader
                user={user}
            />
            <ChatContent
                user={user}
            />
            <ChatFooter
                user={user}
            />
        </div>
    )
}

export default Chat