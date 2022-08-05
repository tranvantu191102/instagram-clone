import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Button = (props) => {

    const disable = props.disable ? true : false

    return (
        <button
            className={`w-full flex items-center justify-center py-1 bg-blue-text rounded-md ${disable ? "opacity-50 cursor-default pointer-events-none" : ""}`}
            onClick={props.onClick ? props.onClick : null}
            type={props?.type}
        >
            {
                props.iconLeft ? <FontAwesomeIcon icon={props.iconLeft} /> : null
            }
            <span className='text-white-text text-base font-semibold'>{props.name}</span>
            {
                props.iconRight ? <FontAwesomeIcon icon={props.iconRight} /> : null
            }
        </button>
    )
}

export default Button