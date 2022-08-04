import React from 'react'


const Account = ({ children }) => {


    return (
        <div className='w-full bg-second-bg mt-[60px] flex items-center justify-center'>
            <div className='w-[935px] tab:w-[800px] flex items-center justify-center rounded bg-primary-bg my-6 border-[1px] border-border-color'>
                {children}
            </div>

        </div>
    )
}

export default Account