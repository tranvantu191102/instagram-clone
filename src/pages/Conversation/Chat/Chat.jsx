import React, { useState } from 'react'


import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter'
import ChatContent from './ChatContent'
import SettingConversation from '../SettingConversation'

const Chat = ({ user }) => {

    const [showSettingConversation, setShowSettingConversation] = useState(false)


    return (
        showSettingConversation ?
            <SettingConversation
                user={user}
                setShowSettingConversation={setShowSettingConversation}
            />
            :
            <div className='flex-1 h-full flex items-center justify-center flex-col border-l-[1px] border-border-color'>
                <ChatHeader
                    user={user}
                    setShowSettingConversation={setShowSettingConversation}
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