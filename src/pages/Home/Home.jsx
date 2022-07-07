import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserRedux } from '../../redux/reducers/userReducer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

import StoryCard from '../../components/Stories/StoryCard'
import UserSuggessCard from '../../components/User/UserSuggessCard'
import HomePost from './HomePost'

import userImage from '../../assets/images/user.png'

const Home = () => {

    const userId = useSelector(state => state.user.userId)
    const dispatch = useDispatch()
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            try {
                const userRef = doc(db, 'users', userId)
                const res = await getDoc(userRef)
                const userRes = res.data()
                setUser(userRes)
                dispatch(setUserRedux({ ...userRes }))

            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [])

    return (
        <div className='mt-[60px] bg-second-bg flex items-start justify-center'>
            <div className='w-[820px] flex items-start justify-start'>
                <div className='w-[470px] mr-8'>
                    <div className='flex items-center justify-start pl-6 mt-6 py-4 bg-primary-bg border-[1px] border-gray-bg rounded-lg'>
                        <StoryCard size='small' />
                        <StoryCard size='small' />
                        <StoryCard size='small' />
                    </div>
                    <div>
                        <HomePost />
                    </div>
                </div>
                <div className='w-[318px] mt-7 fixed left-[calc(50%+250px)] transform -translate-x-1/2 h-screen'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center justify-center'>
                            <img src={user.photoURL || userImage}
                                alt=""
                                className='w-[56px] h-[56px] rounded-full'
                            />
                            <div className='ml-4'>
                                <p className='text-base text-primary-text font-semibold'>tranvantu_170</p>
                                <p className='text-base text-gray-text font-semibold'>Trần Văn Tú</p>
                            </div>
                        </div>
                        <button className='text-sm text-blue-text font-semibold'>Switch</button>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='text-base text-gray-text font-semibold'>Suggestions For You</p>
                        <button className='text-sm text-primary-text font-semibold'>See All</button>
                    </div>
                    <div>
                        <UserSuggessCard />
                        <UserSuggessCard />
                        <UserSuggessCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home