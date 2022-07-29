import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useDispatch, useSelector } from 'react-redux'

import Modal from './Modal'
import useDebounce from '../../hooks/useDebounce'
import userImage from '../../assets/images/user.png'
import { addListUserConversation } from '../../redux/reducers/conversationReducer'
import { hide } from '../../redux/reducers/modalReducer'

const ModalAddConsersation = () => {

    const [userSearch, setUserSearch] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [userAdded, setUserAdded] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const debounceSearchTerm = useDebounce(searchTerm)

    const handleOnChangeInput = (event) => {
        const keywords = event.target.value
        setSearchTerm(keywords)
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
                    const q = query(collection(db, 'users'), where('search', 'array-contains', debounceSearchTerm))
                    const querySnapshot = await getDocs(q)
                    let user = []
                    querySnapshot.forEach((doc) => {
                        if (userAdded.length > 0) {
                            let userChoosed = userAdded.find(el => el.id === doc.id)
                            user = [...user, { ...doc.data(), choosed: userChoosed !== undefined }]
                        } else {
                            user = [...user, { ...doc.data(), choosed: false }]
                        }
                    });
                    setUserSearch(user)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        handleSearch()
    }, [debounceSearchTerm])

    const handleChoiceUser = (user) => {
        setUserAdded([...userAdded, { ...user, choosed: true }])
        setSearchTerm("")
        setUserSearch([])
    }

    const handleDeleteUserAdded = (user) => {
        let userAddedCopy = [...userAdded]
        userAddedCopy = userAddedCopy.filter(el => el.id !== user.id)
        setUserAdded(userAddedCopy)
        setSearchTerm("")
        setUserSearch([])
    }

    const handleCreateConversation = () => {
        dispatch(addListUserConversation(userAdded))
        dispatch(hide())
    }



    return (
        <Modal>
            <div className="w-[400px] bg-primary-bg rounded-lg">
                <div className="flex items-center justify-between px-4 h-[42px] border-b-[1px] border-border-color">
                    <div className="">
                        <FontAwesomeIcon icon={faX} />
                    </div>
                    <div className="">
                        <span className='text-lg font-semibold text-primary-text'>
                            New message
                        </span>
                    </div>
                    <div className="">
                        <span className={`text-lg text-blue-text font-semibold
                        ${userAdded.length > 0 ? 'cursor-pointer' : ' opacity-50 pointer-events-none'}
                        `}
                            onClick={handleCreateConversation}
                        >
                            Next
                        </span>
                    </div>
                </div>
                <div className="max-h-[210px] overflow-y-auto flex items-center justify-between py-2 border-b-[1px] border-border-color">
                    <div className="px-4">
                        <span className='text-lg text-primary-text font-semibold py-1 px-3'>To:</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-start flex-wrap">
                            {
                                userAdded && userAdded.length > 0 &&
                                userAdded.map((item, index) => (
                                    <div
                                        className="flex items-center mr-3 last:mr-0 justify-center bg-[#e1f0fc] px-3 py-2 rounded-sm mb-2"
                                        key={index}
                                    >
                                        <div className="text-base text-blue-text font-medium mr-2">
                                            {item.username}
                                        </div>
                                        <div className="text-base text-blue-text font-bold cursor-pointer"
                                            onClick={() => handleDeleteUserAdded(item)}
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <input
                            type="text"
                            placeholder='Seach...'
                            value={searchTerm}
                            className='w-full outline-none border-none placeholder:text-base placeholder:text-gray-text placeholder:py-1 py-2'
                            onChange={(e) => handleOnChangeInput(e)}
                        />
                    </div>
                </div>
                <div className="h-[300px] overflow-y-auto ">
                    {
                        userSearch && userSearch.length > 0 &&
                        userSearch.map((item, index) => (
                            <UserSeach
                                key={index}
                                user={item}
                                handleChoiceUser={handleChoiceUser}
                                choosed={item.choosed}
                            />
                        ))
                    }
                </div>
            </div>
        </Modal>
    )
}

export default ModalAddConsersation


const UserSeach = ({ user, handleChoiceUser, choosed }) => {

    const preventClick = () => {

    }

    return (
        <div className='flex items-center justify-between px-4 py-2'>
            <div className="flex items-center justify-center ">
                <img
                    src={user.photoURL || userImage} alt=""
                    className='w-[44px] h-[44px] rounded-full mr-2' />
                <div>
                    <p className='text-base text-primary-text font-semibold'>{user.username}</p>
                    <p className='text-base text-gray-text font-normal'>{user.fullname}</p>
                </div>
            </div>
            <div>

                {choosed ?
                    <button className={`py-1 px-2 bg-blue-text text-white-text border-none border-[1px] border-black rounded-full pointer-events-none opacity-40`}
                        onClick={() => preventClick(user)}

                    >
                        <FontAwesomeIcon icon={faCheck} />

                    </button>
                    :
                    <button className={`p-3 border-[1px] border-black rounded-full`}
                        onClick={() => handleChoiceUser(user)}
                    >
                    </button>
                }

            </div>
        </div>
    )
}