import React from 'react'
import { useDispatch } from 'react-redux'
import { addUserActive } from '../../redux/reducers/conversationReducer'

import userImage from '../../assets/images/user.png'


const UserCard = ({ user }) => {

    const dispatch = useDispatch()

    const handleActiveUser = () => {
        dispatch(addUserActive(user))
    }

    console.log(user)

    return (
        <div className='py-3 px-4 hover:bg-second-bg cursor-pointer flex items-center justify-start'
            onClick={handleActiveUser}
        >
            <div className='mr-4'>
                <img
                    src={user.photoURL || userImage}
                    alt=""
                    className='w-[56px] h-[56px] rounded-full'
                />
            </div>
            <div>
                <h4 className='text-base text-primary-text font-semibold'>{user.fullname}</h4>
            </div>
        </div>
    )
}

export default UserCard