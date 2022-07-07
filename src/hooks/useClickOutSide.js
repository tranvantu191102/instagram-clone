import { useDispatch } from 'react-redux'

import { hide } from "../redux/reducers/modalReducer"
const useClickOutSide = (contentRef, modalRef) => {
    const dispatch = useDispatch()
    const handler = (event) => {
        if (!contentRef.current.contains(event.target)) {
            modalRef.current.classList.remove('active')
            dispatch(hide())
        }
    }

    window.addEventListener('mousedown', handler)
}

export default useClickOutSide
