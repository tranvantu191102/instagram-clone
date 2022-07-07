import React from 'react'

const UserCard = () => {
    return (
        <div className='py-3 px-4 hover:bg-second-bg cursor-pointer flex items-center justify-start'>
            <div className='mr-4'>
                <img
                    src="https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/86766289_876973282736641_7952438239841746944_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=RcKFRphg5AoAX8IRQCg&_nc_ht=scontent.fdad3-3.fna&oh=00_AT9C-Rm3HWsxJf3XuEEOBQLO4m59AwWHNUcETu6Dc6y-jA&oe=62D25119"
                    alt=""
                    className='w-[56px] h-[56px] rounded-full'
                />
            </div>
            <div>
                <h4 className='text-base text-primary-text font-semibold'>Trinh Nguyen</h4>
                <p className='text-base text-gray-text font-normal'>Sent you a messages <span>25w</span></p>
            </div>
        </div>
    )
}

export default UserCard