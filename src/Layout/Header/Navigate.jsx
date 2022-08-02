import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faPaperPlane,
    faSquarePlus,
    faCompass,
    faHeart
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/userReducer'
import { show, hide } from '../../redux/reducers/modalReducer'
import { refreshConversation } from '../../redux/reducers/conversationReducer'
import { refreshPost } from '../../redux/reducers/postReducer'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useSelector } from 'react-redux/es/exports'

import userImage from '../../assets/images/user.png'
import userActions from '../../assets/fake-data/user-actions'
const Navigate = () => {


    const [activeIndex, setActiveIndex] = useState(0)
    const [isShowActions, setIsShowActions] = useState(false)
    const userCurrent = useSelector(state => state.user.userData)
    const userRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const listener = (e) => {
            if (e.target === userRef.current) {
                setIsShowActions(!isShowActions)
            } else {
                setIsShowActions(false)
            }
        }
        window.addEventListener('click', listener)
        return () => {
            window.removeEventListener('click', listener)
        }
    }, [isShowActions])

    const handleLogOut = async () => {
        try {
            await signOut(auth)
            dispatch(logout())
            dispatch(hide())
            dispatch(refreshConversation())
            dispatch(refreshPost())
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowModalPost = () => {
        setActiveIndex(2)
        dispatch(show('MODAL_ADD_POST'))
    }

    return (
        <div className='flex items-center'>

            <div className='mr-6'>
                <Link
                    to="/"
                    className={`text-xl text-gray-text ${activeIndex === 0 ? 'text-black' : ''}`}
                    onClick={() => setActiveIndex(0)}>
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
            <div className='mr-6' >
                <Link to="/conversation"
                    className={`text-xl text-gray-text ${activeIndex === 1 ? 'text-black' : ''}`}
                    onClick={() => setActiveIndex(1)}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Link>
            </div>
            <div className='mr-6'>
                <div className={`text-xl cursor-pointer text-gray-text ${activeIndex === 2 ? 'text-black' : ''}`}
                    onClick={() => handleShowModalPost()}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </div>
            </div>
            <div className='mr-6'>
                <Link to="/explore"
                    className={`text-xl text-gray-text ${activeIndex === 3 ? 'text-black' : ''}`}
                    onClick={() => setActiveIndex(3)}>
                    <FontAwesomeIcon icon={faCompass} />
                </Link>
            </div>
            <div className='mr-6'>
                <div className={`text-xl cursor-pointer text-gray-text ${activeIndex === 4 ? 'text-black' : ''}`}
                    onClick={() => setActiveIndex(4)}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
            <div className='relative'>
                <img ref={userRef}
                    src={userCurrent.photoURL || userImage}
                    alt="user"
                    className='w-6 h-6 rounded-full cursor-pointer'
                // onClick={() => setIsShowActions(!isShowActions)}
                />
                {
                    isShowActions &&
                    <div className='absolute top-[40px] right-[-30px] w-[230px] bg-primary-bg shadow-primary rounded-lg 
                before:content-[""] before:absolute before:border-solid before:border-x-[10px] before:border-x-transparent before:border-b-transparent
                before:border-t-transparent before:border-b-[10px] before:right-[22px] before:-top-4 z-[99] before:h-5  before:-translate-x-1/2 before:transform
            ' >
                        {
                            userActions.map((item, index) => (
                                <div key={index}>
                                    <Link to={item.path} className="flex cursor-pointer items-center justify-start px-4 py-2 hover:bg-second-bg">
                                        <div className='mr-2'>
                                            <FontAwesomeIcon icon={item.icon} />
                                        </div>
                                        <p className='text-base'>{item.name}</p>
                                    </Link>
                                </div>
                            ))
                        }
                        <div className='border-t-2 border-gray-bg'>
                            <p className='px-4 py-2 cursor-pointer' onClick={handleLogOut}>Log Out</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navigate