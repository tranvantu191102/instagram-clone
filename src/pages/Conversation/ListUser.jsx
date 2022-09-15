import React from 'react'
import UserCard from './UserCard'



const ListUser = ({ listUser, listUserRedux }) => {

    return (
        <div className='overflow-auto h-[calc(100vh-158px)]'>
            {
                listUserRedux && listUserRedux.length > 0 &&
                listUserRedux.map((item, index) => (
                    <UserCard
                        key={index}
                        user={item}
                    />
                ))
            }
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