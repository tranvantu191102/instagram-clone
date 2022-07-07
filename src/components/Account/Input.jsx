import React from 'react'

const Input = (props) => {

    const onChange = (e) => {
        if (!props.onChange) return

        props.onChange(e.target.value)
    }

    return (
        <input
            type="text"
            value={props.value ? props.value : undefined}
            className={`text-lg px-3 font-extralight border-[1px] border-border-color w-full py-1 ${props.disabled ? "text-gray-text bg-gray-bg" : "text-primary-text"}`}
            onChange={onChange}
            disabled={props.disabled ? props.disabled : false}
            placeholder={props.placeholder ? props.placeholder : undefined}
        />
    )
}

export default Input