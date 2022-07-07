import React, { useRef, useEffect } from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'

import { hide } from "../../redux/reducers/modalReducer"
// import useClickOutSide from '../../hooks/useClickOutSide'

const Modal = ({ children }) => {
    const dispatch = useDispatch()
    const contentRef = useRef()
    const modalRef = useRef()

    useEffect(() => {
        const listener = (e) => {
            if (e.target === modalRef.current) {
                dispatch(hide())
            }
        }
        modalRef.current.addEventListener('click', listener)

    }, [])

    return (
        <div
            className='fixed overflow-y-scroll h-full inset-0 bg-[rgba(0,0,0,0.65)] opacity-100 flex items-center justify-center z-[99]'
            ref={modalRef}
        >
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]'
                ref={contentRef}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal