import React from 'react'
import Skeleton from './Skeleton'

const SkeletonUserChat = () => {
    return (
        <div className='flex items-center justify-start px-4 my-3'>
            <Skeleton
                className='w-[56px] h-[56px] rounded-full mr-4'
            ></Skeleton>
            <div className="">
                <Skeleton className='h-4 w-[200px] mb-2 rounded-sm'></Skeleton>
                <Skeleton className='h-4 w-[180px]  rounded-sm'></Skeleton>
            </div>
        </div>
    )
}

export default SkeletonUserChat