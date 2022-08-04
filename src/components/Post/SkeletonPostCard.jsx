import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

const SkeletonPostCard = () => {
    return (
        <div className='bg-primary-bg rounded-lg border-[1px] border-gray-bg mt-4'>
            <div className='pl-3 py-2 flex items-center justify-between'>
                <div className='flex items-center justify-center'>
                    <Skeleton
                        className='w-8 h-8 rounded-full'
                    ></Skeleton>
                    <Skeleton
                        className='ml-2 w-[200px] h-4'
                    >
                    </Skeleton>
                </div>
            </div>
            <div>
                <Skeleton
                    className='h-[470px] w-full mb-4'
                >
                </Skeleton>
            </div>
            <div className='pr-5 mt-1'>
                <Skeleton className='h-[10px] my-1'  > </Skeleton>
                <Skeleton className='h-[20px] my-1'  >  </Skeleton>
                <Skeleton className='h-[20px] my-2' >  </Skeleton>
                <Skeleton className='h-[30px] mb-5' >  </Skeleton>
            </div>

        </div>

    )
}

export default SkeletonPostCard