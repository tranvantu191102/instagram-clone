import React from 'react'
import Skeleton from './Skeleton'

const SkeletonSuggestionUser = () => {
    return (
        <div className="flex items-center justify-start mb-4">
            <Skeleton
                className='h-8 w-8 rounded-full mr-5'
            ></Skeleton>
            <div className="">
                <Skeleton className="w-[100px] h-3 mb-1"></Skeleton>
                <Skeleton className="w-[70px] h-3"></Skeleton>
            </div>
        </div>
    )
}

export default SkeletonSuggestionUser