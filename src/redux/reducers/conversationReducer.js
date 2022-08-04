import { createSlice } from "@reduxjs/toolkit"

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        listUser: [],
        userActive: {},
        messageId: ''
    },
    reducers: {
        addListUserConversation(state, action) {
            state.listUser = state.listUser.concat(action.payload);
        },
        editListUser(state, action) {
            const listUserCopy = [...state.listUser]
            const userRest = listUserCopy.filter(el => el.id !== action.payload.id)
            state.listUser = userRest

        },
        addUserActive(state, action) {
            state.userActive = action.payload
        },
        setMessageId(state, action) {
            state.messageId = action.payload
        },
        refreshConversation(state) {
            state.listUser = []
            state.userActive = {}
        },

    }
})

export const {
    addListUserConversation,
    addUserActive,
    refreshConversation,
    editListUser,
    setMessageId
} = conversationSlice.actions
export default conversationSlice.reducer