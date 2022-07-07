import React, { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './Header/Header'
import { publicRouters } from '../routes'
import ModalImage from '../components/Modal/ModalImage'
import PostModalCard from '../components/Post/PostModalCard'
import ModalAddPost from '../components/Modal/ModalAddPost'


const Layout = () => {

    const login = useSelector(state => state.user.login)
    const isShowModalPostCard = useSelector(state => state.post.isShowModalPostCard)
    const isShowModalPost = useSelector(state => state.modal.showModalAddPost)
    const isShowModalImage = useSelector(state => state.modal.showModalImage)
    // const login = true
    // const isShowModalPost = false
    // console.log("login", login)

    useEffect(() => {
        if (isShowModalImage || isShowModalPost || isShowModalPostCard) {
            document.body.classList.add('overflow-hidden')
        } else document.body.classList.remove('overflow-hidden')
    }, [isShowModalImage, isShowModalPost, isShowModalPost])


    return (
        <div >
            {
                <BrowserRouter>
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

                </BrowserRouter>
            }
            {
                isShowModalPost && <ModalAddPost />
            }
            {
                isShowModalImage && <ModalImage />
            }
            {
                isShowModalPostCard && <PostModalCard />
            }
        </div>
    )
}


export default Layout