import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'


const ModalSettingComment = ({ setModal, toggleRef }) => {

    const contentRef = useRef(null)

    useEffect(() => {
        const handler = (event) => {
            if (!contentRef.current.contains(event.target) && toggleRef.current !== event.target) {
                setModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    return (
        <div className='fixed inset-0 w-full h-full z-[9999] bg-[rgba(0,0,0,0.65)]'>
            <div ref={contentRef}
                className="absolute w-[400px] bg-primary-bg rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-red-color font-bold text-base'>
                        Report
                    </p>
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-red-color font-bold text-base'>
                        Delete
                    </p>
                </div>
                <div className='py-2 cursor-pointer'>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'>
                        Cancel
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ModalSettingComment