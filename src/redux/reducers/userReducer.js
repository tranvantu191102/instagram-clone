import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: false,
        userId: "",
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
            state.userData = { ...action.payload }
        }
    }
})

export const {
    login,
    logout,
    setUserRedux
} = userSlice.actions
export default userSlice.reducer