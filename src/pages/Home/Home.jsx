import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserRedux } from '../../redux/reducers/userReducer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

import HomePost from './HomePost'
import Suggession from './Suggession'

import userImage from '../../assets/images/user.png'
import _ from 'lodash'
import Skeleton from '../../components/Skeleton/Skeleton'


const Home = () => {

    const userId = useSelector(state => state.user.userId)
    const login = useSelector(state => state.user.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (!login) {
            return navigate('/login')
        }

        const getUser = async () => {
            try {
                setLoading(true)
                const userRef = doc(db, 'users', userId)
                const res = await getDoc(userRef)
                const userRes = res.data()
                setUser(userRes)
                dispatch(setUserRedux({ ...userRes }))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getUser()
    }, [])

    const handleGotoProfile = () => {
        navigate('/profile')
    }

    return (
        user && !_.isEmpty(user) &&
        <div className='mt-[60px] bg-second-bg flex items-start justify-center'>
            <div className='w-[820px] flex items-start justify-start'>
                <div className='w-[470px] mr-8'>
                    <HomePost />
                </div>
                <div className='w-[318px] mt-7 fixed left-[calc(50%+250px)] transform -translate-x-1/2 h-screen'>
                    {
                        loading ?
                            <div className="">
                                <Skeleton
                                    className='h-11 w-11 rounded-full mr-5'
                                ></Skeleton>
                                <div className="">
                                    <Skeleton className="w-[100px] h-5 mb-1"></Skeleton>
                                    <Skeleton className="w-[70px] h-5"></Skeleton>
                                </div>
                            </div>
                            :
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center justify-center'>
                                    <img src={user.photoURL || userImage}
                                        alt=""
                                        className='w-[56px] h-[56px] rounded-full cursor-pointer'
                                        onClick={handleGotoProfile}
                                    />
                                    <div className='ml-4'>
                                        <p className='text-base text-primary-text font-semibold cursor-pointer'
                                            onClick={handleGotoProfile}
                                        >tranvantu_170</p>
                                        <p className='text-base text-gray-text font-semibold'>Trần Văn Tú</p>
                                    </div>
                                </div>
                                <button className='text-sm text-blue-text font-semibold'>Switch</button>
                            </div>
                    }
                    {
                        <Suggession user={user} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home