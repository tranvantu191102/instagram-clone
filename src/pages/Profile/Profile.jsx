import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faTableCells, faBookmark, faIdCardClip } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import userImage from '../../assets/images/user.png'


import StoryCard from '../../components/Stories/StoryCard'
import Footer from '../../Layout/Footer'
import Post from './Post'
import Saved from './Saved'
import Tagged from './Tagged'

const Profile = () => {

    const catalogProfile = [
        {
            icon: faTableCells,
            name: 'Post'
        },
        {
            icon: faBookmark,
            name: 'Saved'
        },
        {
            icon: faIdCardClip,
            name: 'Tagged'
        },

    ]
    const [activeIndex, setActiveIndex] = useState(0)
    const user = useSelector(state => state.user.userData)



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
                            <button className='px-2 py-[5px] border-[1px] mr-4 border-gray-text rounded-lg font-semibold text-base'>
                                <Link to="/account/edit-profile">Edit profile</Link>
                            </button>
                            <div className='text-xl cursor-pointer p-2'>
                                <FontAwesomeIcon icon={faGear} />
                            </div>
                        </div>
                        <div className='flex items-center justify-between pr-4 mt-4'>
                            <p className='text-lg text-primary-text font-normal'>
                                <span className='font-semibold'>1</span> post
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
                <div className='mt-14 ml-16'>
                    <div className='flex items-center justify-start'>
                        <StoryCard />
                        <StoryCard />
                        <StoryCard />
                    </div>
                    <h3 className='text-base text-primary-text font-semibold mt-2'>Tin noi bat</h3>
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
                    activeIndex === 0 && <Post user={user} />
                }
                {
                    activeIndex === 1 && <Saved />
                }
                {
                    activeIndex === 2 && <Tagged />
                }
                <Footer />
            </div>
        </div>
    )
}

export default Profile