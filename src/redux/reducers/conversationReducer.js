import { createSlice } from "@reduxjs/toolkit"

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        listUser: [],
        userActive: {},
    },
    reducers: {
        addListUserConversation(state, action) {
            state.listUser = state.listUser.concat(action.payload);
        },
        addUserActive(state, action) {
            state.userActive = action.payload
        }
    }
})

export const {
    addListUserConversation,
    addUserActive
} = conversationSlice.actions
export default conversationSlice.reducer