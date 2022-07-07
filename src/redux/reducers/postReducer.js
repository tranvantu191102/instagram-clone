import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isShowModal: false,
        isShowModalPostCard: false,
        postCard: {}
    },
    reducers: {
        showModal(state) {
            state.isShowModal = true;
        },
        hiddenModal(state) {
            state.isShowModal = false;
        },
        showModalPostCard(state) {
            state.isShowModalPostCard = true;
        },
        hideModalPostCard(state) {
            state.isShowModalPostCard = false;
        },
        addPostCard(state, action) {
            state.postCard = action.payload
        }
    }
})

export const {
    showModal,
    hiddenModal,
    showModalPostCard,
    hideModalPostCard,
    addPostCard
} = postSlice.actions
export default postSlice.reducer