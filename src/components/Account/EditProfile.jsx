import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import { setUserRedux } from '../../redux/reducers/userReducer';
import { show } from '../../redux/reducers/modalReducer';

import Account from './Account'
import Sidebar from './Sidebar'
import Input from './Input'
import { db } from '../../firebase/config'
import { genders } from '../../assets/fake-data/genders';

import userImage from '../../assets/images/user.png'

const EditProfile = () => {

    const userId = useSelector(state => state.user.userId)
    const user = useSelector(state => state.user.userData)
    const [username, setUsername] = useState(user.username)
    const [fullname, setFullname] = useState(user.fullname)
    const [website, setWebsite] = useState(user.website || "")
    const [description, setDescription] = useState(user.description || "")
    const [email, setEmail] = useState(user.email)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "")
    const [gender, setGender] = useState(user.gender || 1)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSaveUserInfo = async () => {
        try {
            setLoading(true)
            const docRef = doc(db, 'users', userId)
            user.search.pop()
            user.search.push(username)
            const newData = {
                ...user,
                email,
                username,
                website,
                phoneNumber,
                description,
                gender,
            }
            await setDoc(docRef, newData)
            dispatch(setUserRedux(newData))
            setLoading(false)
            window.location.reload()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handleShowModal = () => {
        dispatch(show('MODAL_IMAGE'))
    }


    return (
        email &&
        <Account>
            <div className='w-full flex items-start justify-center'>
                <div className='w-1/4 '>
                    <Sidebar />
                </div>
                <div className='w-3/4 border-l-[1px] border-border-color'>
                    <div className='flex items-center justify-center mt-8'>
                        <div className='w-1/4 flex items-center justify-end mr-8 cursor-pointer'>
                            <img
                                src={user.photoURL || userImage}
                                alt=""
                                className='w-10 h-10 rounded-full'
                                onClick={handleShowModal}
                            />
                        </div>
                        <div className='w-3/4'>
                            <h3 className='text-2lg text-primary-text font-normal'>{user.username}</h3>
                            <span className='text-base text-blue-text font-semibold cursor-pointer'
                                onClick={handleShowModal}
                            >
                                Change Profile Photo
                            </span>
                        </div>
                    </div>
                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Name</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <Input
                                disabled={true}
                                value={fullname}
                            />
                            <div className='text-sm text-gray-text font-light leading-3 mt-4'>
                                You are using the same name on Instagram and Facebook. Go to Facebook to change your name.
                                <a href="https://www.facebook.com/settings/?tab=account&section=name"
                                    className='text-blue-text font-normal'
                                > Learn more</a>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Username</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <Input
                                disabled={false}
                                value={username}
                                onChange={(e) => setUsername(e)}
                            />
                            <div className='text-sm text-gray-text font-light leading-4 mt-4'>
                                In most cases, you'll be able to change your username back to tranvantu_170 for another 14 days.
                                <a href="https://help.instagram.com/876876079327341"
                                    className='text-blue-text font-normal'
                                > Learn more</a>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Website</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <Input
                                disabled={false}
                                placeholder="Website"
                                value={website}
                                onChange={(e) => setWebsite(e)}
                            />
                        </div>
                    </div>

                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Bio</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <textarea
                                placeholder='Bio...'
                                className='border-[1px] border-border-color w-full p-1 pl-3'
                                value={description || undefined}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                            <h3 className='text-base font-bold text-gray-text mt-2'>Personal Information</h3>
                            <p className='text-sm text-gray-text font-normal leading-4'>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
                        </div>
                    </div>
                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Email</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <Input
                                disabled={false}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e)}
                            />
                        </div>
                    </div>
                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Phone Number</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <Input
                                disabled={false}
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e)}
                            />
                        </div>
                    </div>
                    <div className='flex items-start justify-center mt-4'>
                        <div className='w-1/4 flex items-center justify-end mr-8'>
                            <span className='text-lg text-primary-text font-semibold'>Gender</span>
                        </div>
                        <div className='w-3/4 pr-40'>
                            <select
                                value={gender || 1}
                                className='w-full py-1 text-lg px-3 font-extralight border-[1px] border-border-color text-primary-text'
                                onChange={(e) => setGender(e.target.value)}
                            >
                                {
                                    genders.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <button
                                className='text-base bg-blue-text text-white-text py-1 px-2 font-semibold rounded mt-8 mb-4'
                                onClick={handleSaveUserInfo}
                            >
                                {loading ? "Loading..." : 'Submit'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </Account>
    )
}

export default EditProfile