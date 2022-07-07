import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import userImage from '../../assets/images/user.png'
import { Link } from 'react-router-dom'


const UserCardSearch = (props) => {

    const data = props.data

    return (
        <Link to={`profile/${data.id}`} className=''>
            <div className='flex items-center justify-start p-2 hover:bg-second-bg'>
                <div className='mr-3'>
                    <img
                        src={data.photoURL || userImage} alt=""
                        className='w-[44px] h-[44px] rounded-full'
                    />
                </div>
                <div className='flex items-start justify-start flex-col'>
                    <p className='text-base text-primary-text font-semibold'>{data.username}<span>{data.ticked ? <FontAwesomeIcon /> : null}</span></p>
                    <span className='text-base text-gray-text font-normal'>{data.fullname}</span>
                </div>
            </div>
        </Link>
    )
}

export default UserCardSearch