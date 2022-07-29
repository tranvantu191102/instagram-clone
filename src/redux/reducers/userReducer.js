import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: false,
        userId: "",
        userPost: {},
        userData: {}
    },
    reducers: {
        login(state, action) {
            state.login = true;
            state.userId = action.payload
        },
        logout(state) {
            state.login = false;
            state.userData = {};
            state.userId = ""
        },
        setUserRedux(state, action) {
            state.userData = action.payload
        },
        setUserPost(state, action) {
            state.userPost = action.payload
        },
    }
})

export const {
    login,
    logout,
    setUserRedux,
    setUserPost
} = userSlice.actions
export default userSlice.reducer