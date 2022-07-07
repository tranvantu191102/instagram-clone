import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const Sidebar = () => {

    const sidebar = [
        {
            path: '/account/edit-profile',
            title: 'Edit Profile'
        },
        {
            path: '/account/edit-profile',
            title: 'Change Password'
        },
        {
            path: '/account/edit-profile',
            title: 'Apps and Websites'
        },
        {
            path: '/account/edit-profile',
            title: 'Email Notifications'
        },
        {
            path: '/account/edit-profile',
            title: 'Push Notifications'
        },
        {
            path: '/account/edit-profile',
            title: 'Manage Contacts'
        },
        {
            path: '/account/edit-profile',
            title: 'Privacy and Security'
        },
        {
            path: '/account/edit-profile',
            title: 'Login Activity'
        },
        {
            path: '/account/edit-profile',
            title: 'Emails from Instagram'
        },
        {
            path: '/account/edit-profile',
            title: 'Help'
        }
    ]
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className=''>
            <ul className='flex flex-col justify-center'>
                {
                    sidebar.map((item, index) => (
                        <li
                            key={index}
                            className={`py-4 relative pl-8 pr-4  hover:bg-second-bg cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:left-0 
                        hover:before:h-full hover:before:w-[2px] hover:before:bg-gray-text
                        ${activeIndex === index ? "before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-[2px] before:bg-primary-text" : ""}
                    `}
                        >
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    ))
                }
            </ul>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-base text-blue-text font-medium mt-4'>Switch to Professional</p>
                <p className='text-base text-blue-text font-medium mt-2 mb-3'>Account</p>
            </div>
        </div>

    )
}

export default Sidebar