import React, { useState, useEffect, useRef } from 'react'
import { updateDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { hide, show } from '../../redux/reducers/modalReducer'
import { setUserRedux } from '../../redux/reducers/userReducer'



const OptionPostCardUser = ({ post, user, setShowOptionPostCard }) => {

    const userCurrent = useSelector(state => state.user.userData)
    const [loading, setLoading] = useState(false)
    const [copy, setCopy] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const contentRef = useRef(null)

    useEffect(() => {
        const handler = (event) => {
            if (!contentRef.current.contains(event.target)) {
                setShowOptionPostCard(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

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
            dispatch(hide())
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleCopyLinkUrl = () => {
        const el = document.createElement('input');
        el.value = `${window.location.href}post/${post.id}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopy(true)
    }

    const handleGotoPost = () => {
        // navigate(`/post/${post.id}`)
        setShowOptionPostCard(false)
        dispatch(show('MODAL_POST'))
    }

    const handleCancelOption = () => {
        setShowOptionPostCard(false)
    }





    return (
        <div className='fixed inset-0 w-full h-full z-[9999] bg-[rgba(0,0,0,0.65)]'>
            <div ref={contentRef}
                className="absolute w-[400px] bg-primary-bg rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-red-color font-bold text-base'>
                        Report
                    </p>
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-red-color font-bold text-base'
                        onClick={handleUnFollowUser}
                    >
                        Unfollow
                    </p>
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'
                        onClick={handleGotoPost}
                    >
                        Go to post
                    </p>
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'>
                        Share to
                    </p>
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'
                        onClick={handleCopyLinkUrl}
                    >
                        {copy ? 'Copied success!' : 'Copy link'}
                    </p>
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'>
                        Embed
                    </p>
                </div>
                <div className='py-2 cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'
                        onClick={handleCancelOption}
                    >
                        Cancel
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OptionPostCardUser