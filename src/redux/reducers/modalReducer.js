import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModalImage: false,
        showModalAddPost: false,
        showModalPost: false,
        showOptionPostCard: false,
        showModalSetting: false,
        showModalSettingComment: false,
        showModalUnFollow: false,
        showModalSettingUser: false,
        showModalAddConversation: false,
        showModalUnsendMessage: false
    },
    reducers: {
        show(state, action) {
            switch (action.payload) {
                case 'MODAL_IMAGE':
                    state.showModalImage = true;
                    break;
                case 'MODAL_ADD_POST':
                    state.showModalAddPost = true;
                    break;
                case 'MODAL_POST':
                    state.showModalPost = true;
                    break;
                // case 'MODAL_POST_OPTIONS':
                //     state.showModalPostOptions = true;
                //     break;
                case 'MODAL_SETTING':
                    state.showModalSetting = true;
                    break;
                case 'MODAL_SETTING_COMMENT':
                    state.showModalSettingComment = true;
                    break;
                case 'MODAL_UNFOLLOW':
                    state.showModalUnFollow = true;
                    break;
                case 'MODAL_SETTING_USER':
                    state.showModalSettingUser = true;
                    break;
                case 'MODAL_ADD_CONVERSATION':
                    state.showModalAddConversation = true;
                    break;
                case 'MODAL_UNSEND_MESSAGE':
                    state.showModalUnsendMessage = true;
                    break;
                default: return
            }
        },
        hide(state, action) {
            switch (action.payload) {
                case 'MODAL_IMAGE':
                    state.showModalImage = false;
                    break;
                case 'MODAL_ADD_POST':
                    state.showModalAddPost = false;
                    break;
                case 'MODAL_POST':
                    state.showModalPost = false;
                    break;
                // case 'MODAL_POST_OPTIONS':
                //     state.showModalPostOptions = false;
                //     break;
                case 'MODAL_SETTING':
                    state.showModalSetting = false;
                    break;
                case 'MODAL_SETTING__COMMENT':
                    state.showModalSettingComment = false;
                    break;
                case 'MODAL_UNFOLLOW':
                    state.showModalUnFollow = false;
                    break;
                case 'MODAL_SETTING_USER':
                    state.showModalSettingUser = false;
                    break;
                case 'MODAL_ADD_CONVERSATION':
                    state.showModalAddConversation = false;
                    break;
                case 'MODAL_UNSEND_MESSAGE':
                    state.showModalUnsendMessage = false;
                    break;
                default:
                    state.showModalAddPost = false;
                    state.showModalImage = false;
                    state.showModalPost = false;
                    state.showModalPostOptions = false;
                    state.showModalSetting = false;
                    state.showModalSettingComment = false;
                    state.showModalUnFollow = false;
                    state.showModalSettingUser = false;
                    state.showModalAddConversation = false;
                    state.showModalUnsendMessage = false;
            }
        },
    }
})

export const {
    show,
    hide
} = modalSlice.actions
export default modalSlice.reducer