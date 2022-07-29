import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: 'post',
    initialState: {
        postCard: {},
        postList: [],
    },
    reducers: {
        addPostCard(state, action) {
            state.postCard = action.payload
        },
        addPostList(state, action) {
            state.postList = action.payload
        }
    }
})

export const {
    addPostCard,
    addPostList
} = postSlice.actions
export default postSlice.reducer