import React from 'react'
import Modal from './Modal'

const ModalSettingAccount = () => {



    return (
        <Modal>
            <div className='w-[400px] bg-primary-bg flex items-center justify-center flex-col rounded-lg'>
                <div className='w-full border-b-[1px] border-border-color cursor-pointer'>
                    <span className='w-full block py-3 text-center text-red-color font-bold text-base'>
                        Block
                    </span>
                </div>
                <div className='w-full border-b-[1px] border-border-color cursor-pointer'>
                    <span className='w-full block py-3 text-center text-red-color font-bold text-base'>Restrict</span>
                </div>
                <div className='w-full border-b-[1px] border-border-color cursor-pointer'>
                    <span className='w-full block py-3 text-center text-red-color font-bold text-base'>Report</span>
                </div>
                <div className='w-full border-b-[1px] border-border-color cursor-pointer'>
                    <span className='w-full block py-3 text-center text-primary-text font-semibold text-base'>Embed</span>
                </div>
                <div className='w-full cursor-pointer '>
                    <span className='w-full block py-3 text-center text-primary-text font-semibold text-base'> Cancel</span>
                </div>
            </div>
        </Modal>
    )
}

export default ModalSettingAccount