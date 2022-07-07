import React from 'react'

const UserSuggessCard = () => {
  return (
    <div className='flex items-center justify-between my-4'>
      <div className='flex items-center justify-center'>
        <img src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-1/281988307_1433042003796430_3461745100172633469_n.jpg?stp=dst-jpg_p160x160&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ZKYtFKPPu8IAX-qVWmv&_nc_ht=scontent.fdad3-1.fna&oh=00_AT_wtSrTrx3qcpDImhFxugZvs2Ieynf9h5VZd_i2_-cgQw&oe=62B1D8EF"
          alt=""
          className='w-[32px] h-[32px] rounded-full'
        />
        <div className='ml-4'>
          <p className='text-base text-primary-text font-semibold hover:underline cursor-pointer'>tranvantu_170</p>
          <p className='text-base text-gray-text font-semibold'>Trần Văn Tú</p>
        </div>
      </div>
      <button className='text-sm text-blue-text font-semibold'>Follow</button>
    </div>
  )
}

export default UserSuggessCard