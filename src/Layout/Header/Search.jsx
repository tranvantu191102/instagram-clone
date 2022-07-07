import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'
import ReactLoading from 'react-loading';

import useDebounce from '../../hooks/useDebounce'
import UserCardSearch from '../../components/User/UserCardSearch';

const Search = () => {

    const [showResultsSearch, setShowResultsSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [userSearch, setUserSearch] = useState([])
    const [loading, setLoading] = useState(false)
    const inputRef = useRef()
    const contentRef = useRef()
    const xmarkRef = useRef()

    const handleFocusInput = () => {
        inputRef.current.focus()
    }

    const debounceSearchTerm = useDebounce(searchTerm)

    const handleOnChangeInput = (event) => {
        const keywords = event.target.value
        setSearchTerm(keywords)
        setShowResultsSearch(true)
    }

    useEffect(() => {
        const handleSearch = async () => {
            try {

                if (!searchTerm) {
                    setUserSearch([])
                    return
                }
                if (debounceSearchTerm) {
                    setLoading(true)
                    setShowResultsSearch(true)
                    const q = query(collection(db, 'users'), where('search', 'array-contains', debounceSearchTerm))
                    const querySnapshot = await getDocs(q)
                    let user = []
                    querySnapshot.forEach((doc) => {
                        user = [...user, doc.data()]
                    });
                    setUserSearch(user)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setShowResultsSearch(true)
                setLoading(false)
            }
        }
        handleSearch()
    }, [debounceSearchTerm])

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!contentRef.current.contains(e.target)) {
                setSearchTerm("")
                setShowResultsSearch(false)
            }
        }
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])

    const handleCancelSearch = () => {
        setSearchTerm("")
    }

    return (
        <div className={`w-[268px] flex items-center ${showResultsSearch ? 'justify-between' : 'justify-center'} px-3 py-2 bg-gray-bg rounded-lg relative`}>
            <div className={`text-base text-gray-text font-normal mr-3 ${showResultsSearch ? 'hidden' : ''}`}
                onClick={handleFocusInput}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
                ref={inputRef}
                className='text-lg font-normal bg-transparent outline-none'
                type="text"
                placeholder='Search...'
                onFocus={() => setShowResultsSearch(true)}
                onChange={(e) => handleOnChangeInput(e)}
            />
            <div className={`text-lg text-gray-text font-normal cursor-pointer ${!showResultsSearch ? 'hidden' : ''}`}
                onClick={handleCancelSearch}
                ref={xmarkRef}
            >

                {
                    loading ? <ReactLoading type='spokes' color='#000' height={15} width={15} />
                        : <FontAwesomeIcon icon={faCircleXmark} className="pointer-events-none" />
                }
            </div>
            <div
                ref={contentRef}
                className={`absolute top-12 left-1/2 transform -translate-x-1/2 h-[362px] w-[375px] bg-primary-bg shadow-primary rounded-lg pt-3
                    ${!showResultsSearch ? 'hidden' : ''} transition-all duration-300 ease-out 
                            `}
            >
                <div
                    className='absolute border-solid border-x-[20px] border-x-transparent border-b-primary-bg border-t-transparent
                    border-b-[20px]  left-1/2 transform -translate-x-1/2 -top-2 
                '
                ></div>
                {
                    loading &&
                    <div className='absolute inset-0 flex items-center justify-center m-auto h-full w-full bg-primary-bg'>
                        <ReactLoading type='spokes' color='#000' height={30} width={30} className="m-auto" />
                    </div>
                }
                {
                    userSearch && userSearch.length > 0 ?
                        <div className='h-full w-full bg-primary-bg overflow-x-auto'>
                            <div>
                                {
                                    userSearch.map((item, index) => (
                                        <div key={index}>
                                            <UserCardSearch data={item} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <>
                            <h3 className='ml-4 font-semibold text-lg'>Recent</h3>
                            <p className='h-full m-auto flex items-center justify-center text-base text-gray-text font-semibold'>
                                No recent searches
                            </p>
                        </>
                }
            </div>
        </div>
    )
}

export default Search