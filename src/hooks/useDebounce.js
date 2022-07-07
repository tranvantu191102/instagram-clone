import { useEffect, useState } from "react"


const useDebounce = (keywords) => {
    const [debounceValue, setDebounceValue] = useState(keywords)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(keywords)
        }, 400)

        return () => {
            clearTimeout(handler)
        }
    }, [keywords])

    return debounceValue

}


export default useDebounce