import React from 'react'

const StoryCard = (props) => {
    return (
        <div className='flex flex-col items-center mr-2'>
            <img
                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/281988307_1433042003796430_3461745100172633469_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8hGKxN7lN1EAX90a9v_&tn=m53jZrkJ0LvBGIcF&_nc_ht=scontent.fdad1-3.fna&oh=00_AT_aj0_HeHnMDrJrseL3PxqHTM9yNzTNctkWQepJRBE3UA&oe=62C9D7AD"
                alt=""
                className={`${props.size === 'small' ? 'w-[56px] h-[56px]' : 'w-[77px] h-[77px]'} rounded-full`}
            />
            <p className='text-sm text-primary-text '>_tranvantu170_</p>
        </div>
    )
}

export default StoryCard