import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header/Header'
import { publicRouters } from '../routes'
import ModalImage from '../components/Modal/ModalImage'
import PostModalCard from '../components/Post/PostModalCard'
import ModalAddPost from '../components/Modal/ModalAddPost'
import ModalSettingAccount from '../components/Modal/ModalSettingAccount'
import ModalAddConsersation from '../components/Modal/ModalAddConsersation'
import ModalUnsendMessage from '../components/Modal/ModalUnsendMessage'

const Layout = () => {

    const login = useSelector(state => state.user.login)
    const navigate = useNavigate()
    const isShowModalPostCard = useSelector(state => state.modal.showModalPost)
    const isShowModalAddPost = useSelector(state => state.modal.showModalAddPost)
    const isShowModalImage = useSelector(state => state.modal.showModalImage)
    const isShowModalSetting = useSelector(state => state.modal.showModalSetting)
    const isShowModalAddConversation = useSelector(state => state.modal.showModalAddConversation)
    const isShowModalUnsendMessage = useSelector(state => state.modal.showModalUnsendMessage)
    // const login = true
    // const isShowModalPost = false

    useEffect(() => {
        if (isShowModalImage || isShowModalAddPost || isShowModalPostCard) {
            document.body.classList.add('overflow-hidden')
        } else document.body.classList.remove('overflow-hidden')
    }, [isShowModalImage, isShowModalAddPost, isShowModalPostCard])

    useEffect(() => {
        if (!login) {
            navigate('/login')
        }
    }, [])


    return (
        <div >
            {
                login && <Header />
            }

            <Routes>
                {
                    publicRouters.map((route, index) => {
                        const Comp = route.element
                        return <Route path={route.path} element={<Comp />} key={index} />
                    })
                }
            </Routes>
            {/* <Footer /> */}

            {
                isShowModalAddPost && <ModalAddPost />
            }
            {
                isShowModalImage && <ModalImage />
            }
            {
                isShowModalPostCard && <PostModalCard />
            }
            {
                isShowModalSetting && <ModalSettingAccount />
            }
            {
                isShowModalAddConversation && <ModalAddConsersation />
            }
            {
                isShowModalUnsendMessage && <ModalUnsendMessage />
            }
        </div>
    )
}


export default Layout