import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { setUserRedux } from '../../redux/reducers/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';

import userImage from '../../assets/images/user.png'

const UserSuggessCard = ({ user }) => {

  const [loading, setLoading] = useState(false)
  const [followed, setFollowed] = useState(false)
  const userCurrent = useSelector(state => state.user.userData)
  const dispatch = useDispatch()


  useEffect(() => {
    const follower = userCurrent.following.filter(id => id === user.id)
    if (follower.length > 0) {
      setFollowed(true)
    }
  }, [userCurrent])

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


  return (
    <div className='flex items-center justify-between my-3'>
      <div className='flex items-center justify-center'>
        <img src={user.photoURL || userImage}
          alt=""
          className='w-[32px] h-[32px] rounded-full'
        />
        <div className='ml-4'>
          <p className='text-base text-primary-text font-semibold hover:underline cursor-pointer'>
            <Link to={`profile/${user.id}`}> {user.username}</Link>
          </p>
          <p className='text-sm text-gray-text font-normal'>{user.fullname}</p>
        </div>
      </div>
      <button className='text-sm text-blue-text font-semibold'
      >
        {
          loading ?
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <FontAwesomeIcon icon={faSpinner} />
            </svg> :
            followed ?
              <p onClick={handleUnFollowUser}>Following</p>
              :
              <p onClick={handleFollowUser}>Follow</p>
        }
      </button>
    </div>
  )
}

export default UserSuggessCard