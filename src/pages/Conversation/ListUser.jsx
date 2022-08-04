import React from 'react'
import UserCard from './UserCard'

import { useSelector } from 'react-redux'


const ListUser = ({ listUser }) => {

    return (
        <div className=''>
            {
                listUser && listUser.length > 0 &&
                listUser.map((item, index) => (
                    <UserCard
                        key={index}
                        user={item}
                    />
                ))
            }
        </div>
    )
}

export default ListUser