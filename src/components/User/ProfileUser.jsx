import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRedux } from '../../redux/reducers/userReducer'
import { show } from '../../redux/reducers/modalReducer';
import { addUserActive } from '../../redux/reducers/conversationReducer'

import Footer from '../../Layout/Footer'
import userImage from '../../assets/images/user.png'
import catalogProfile from '../../assets/fake-data/catalogProfile';
import Post from '../../pages/Profile/Post'
import Tagged from '../../pages/Profile/Tagged'
import Videos from '../../pages/Profile/Videos';
import Reels from '../../pages/Profile/Reels';

const ProfileUser = () => {

    const userCurrent = useSelector(state => state.user.userData)
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [followed, setFollowed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        const getInfoUser = async () => {
            try {
                const userRef = doc(db, 'users', id)
                const docSnap = await getDoc(userRef)
                if (docSnap) {
                    setUser(docSnap.data())
                }

                docSnap.data().followers.forEach((id) => {
                    if (id === userCurrent.id) {
                        setFollowed(true)
                        return
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        getInfoUser()
    }, [id])

    const handleFollowUser = async () => {

        try {
            setLoading(true)
            const userRef = doc(db, 'users', user.id)
            const userCurrentRef = doc(db, 'users', userCurrent.id)

            await updateDoc(userRef, {
                followers: [...user.followers, userCurrent.id]
            })
            await updateDoc(userCurrentRef, {
                following: [...userCurrent.following, user.id]
            })

            dispatch(setUserRedux({
                ...userCurrent,
                following: [...userCurrent.following, user.id]
            }))
            setFollowed(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleUnFollowUser = async () => {
        try {
            setLoading(true)
            const userFollowed = doc(db, 'users', user.id)
            const userFollow = doc(db, 'users', userCurrent.id)

            const following = userCurrent.following.filter(id => id !== user.id)
            const followers = user.followers.filter(id => id !== userCurrent.id)

            await updateDoc(userFollow, {
                following
            })
            await updateDoc(userFollowed, {
                followers
            })
            dispatch(setUserRedux({
                ...userCurrent,
                following
            }))
            setFollowed(false)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleClickSetting = () => {
        dispatch(show('MODAL_SETTING'))
    }

    const handleGotoChat = () => {
        dispatch(addUserActive(user))
        navigate('/conversation')
    }



    return (
        user && !_.isEmpty(user) &&
        <div className='w-full mt-[60px] bg-second-bg flex justify-center'>
            <div className='w-[975px] flex items-start justify-center flex-col py-8'>
                <div className='flex items-center justify-start'>
                    <div className='mx-16'>
                        <img
                            src={user && user.photoURL ? user.photoURL : userImage}
                            alt=""
                            className='w-[150px] h-[150px] rounded-full'
                        />
                    </div>
                    <div className='ml-4'>
                        <div className='flex items-center justify-center'>
                            <h2 className='text-2xl text-primary-text font-light mr-5'>
                                {user.username}
                            </h2>
                            {
                                followed ?
                                    <>
                                        <button className='px-3 py-[5px] border-[1px] mr-4 border-border-color rounded-lg font-semibold text-base'
                                            onClick={handleGotoChat}
                                        >
                                            Message
                                        </button>
                                        <button
                                            className={`px-5 py-[5px] border-[1px] mr-4 border-border-color rounded-lg font-semibold text-base 
                                         ${loading ? 'opacity-50' : ''}
                                        `}
                                            onClick={handleUnFollowUser}
                                        >
                                            <FontAwesomeIcon icon={faCheck} className='text-sm' />
                                            <FontAwesomeIcon icon={faUser} />
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className={`text-base text-white-text px-6 py-1 rounded-md font-semibold bg-blue-text 
                                            ${loading ? 'opacity-50' : ''}
                                        `}
                                            onClick={handleFollowUser}
                                        >
                                            Follow
                                        </button>
                                    </>
                            }
                            <div className='ml-3 text-lg cursor-pointer px-2 py-1'
                                onClick={handleClickSetting}
                            >
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </div>
                        <div className='flex items-center justify-between pr-4 mt-4'>
                            <p className='text-lg text-primary-text font-normal'>
                                <span className='font-semibold'>{user.posts}</span> post
                            </p>
                            <p className='text-lg text-primary-text font-normal'>
                                <span className='font-semibold'>{user.followers.length || 0}</span> followers
                            </p>
                            <p className='text-lg text-primary-text font-normal'>
                                <span className='font-semibold'>{user.following.length || 0}</span> following
                            </p>
                        </div>
                        <div>
                            <h3 className='text-lg text-primary-text font-semibold mt-4'>{user.fullname}</h3>
                            <p className='text-sm text-primary-text font-normal mt-2'>{user.desciption || ""}</p>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-10 border-t-2 border-gray-bg flex items-center justify-center'>
                    {
                        catalogProfile.map((item, index) => (
                            <div
                                className={`mr-12 p-3 cursor-pointer relative
                       ${activeIndex === index ? "before:content-[''] before:w-full before:absolute before:h-[1px] before:bottom-12 before:left-0 before:bg-primary-text" : ""}`}
                                key={index}
                                onClick={() => setActiveIndex(index)}
                            >
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                <span>{item.name}</span>
                            </div>
                        ))
                    }
                </div>
                {
                    activeIndex === 0 && <Post user={user} id={id} />
                }
                {
                    activeIndex === 1 && <Reels />
                }
                {
                    activeIndex === 2 && <Videos />
                }
                {
                    activeIndex === 3 && <Tagged />
                }
                <Footer />
            </div>
        </div>
    )
}

export default ProfileUser