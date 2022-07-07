import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'

const Input = (props) => {
    const [isShowText, setIsShowText] = useState(true)
    const [isShowPassword, setIsShowPassword] = useState(false)

    useEffect(() => {
        if (props.value === "" || props.value === undefined) {

            setIsShowText(true)
        } else {

            setIsShowText(false)
        }

    }, [props.value])


    return (

        <label className='input w-full relative bg-second-bg mb-2 inline-block'>
            {
                isShowText &&
                <span className='absolute top-3 pointer-events-none left-2 text-sm text-gray-text overflow-hidden'>
                    {props.text}
                </span>
            }
            <input
                className=' w-full py-2 pl-2 border-[1px] border-gray-bg bg-transparent focus:border-gray-text outline-none'
                type={props.type === 'password' ? !isShowPassword ? 'password' : 'text' : props.type}
                onChange={props.onChange ? (e) => props.onChange(e.target.value) : null}
                onFocus={props.onFocus ? (e) => props.onFocus(e.target.value) : null}
                onBlur={props.onBlur ? (e) => props.onBlur(e.target.value) : null}
            />
            {
                props.type === 'password' && props.value !== "" &&
                <div>
                    {isShowPassword ?
                        <span className='absolute top-1 z-50 right-2 text-base p-2 font-semibold cursor-pointer'
                            onClick={() => setIsShowPassword(false)}
                        >Hide</span>
                        :
                        <span className='absolute top-1 z-50 right-2 text-base p-2 font-semibold cursor-pointer'
                            onClick={() => setIsShowPassword(true)}
                        >Show</span>
                    }
                </div>
            }
            {
                !props.error && <div className={`absolute top-1 z-50  text-base p-2 font-semibold cursor-pointer ${props.type === 'password' ? 'right-12' : 'right-2'}`}>
                    <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 text-xl" />
                </div>
            }
        </label>
    )
}

export default Input