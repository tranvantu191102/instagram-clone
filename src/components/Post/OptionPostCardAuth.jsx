import React, { useEffect, useRef, useState } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';


import { useDispatch } from 'react-redux';
import { hide } from '../../redux/reducers/modalReducer';
const OptionPostCardAuth = ({ setShowOptionPostCard, post, user, setShowEditPost }) => {

    const contentRef = useRef(null)
    const [copy, setCopy] = useState(false)
    const [comfirmDelete, setComfirmDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const handler = (event) => {
            if (!contentRef.current.contains(event.target)) {
                setShowOptionPostCard(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    const handleCopyLinkUrl = () => {
        const el = document.createElement('input');
        el.value = `${window.location.href}post/${post.id}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopy(true)
    }

    const handleDeletePost = async () => {
        setDeleting(true)
        const postRef = doc(db, 'posts', post.id)
        await deleteDoc(postRef)
        setComfirmDelete(false)
        setShowOptionPostCard(false)
        setShowEditPost(false)
        setDeleting(false)
        dispatch(hide())
    }

    const handleEditPost = () => {
        setShowEditPost(true)
    }

    return (
        <div className='fixed inset-0 w-full h-full z-[9999] bg-[rgba(0,0,0,0.65)]'>
            <div
                ref={contentRef}
                className="absolute w-[400px] bg-primary-bg rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-red-color font-bold text-base'
                        onClick={() => setComfirmDelete(true)}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </p>
                    {
                        comfirmDelete &&
                        <div className='absolute inset-0 w-full h-full bg-primary-bg flex flex-col items-center justify-center'

                        >
                            <span className='block py-2 text-center text-red-color font-bold text-base'>
                                Do you sure delete ?
                            </span>
                            <button onClick={handleDeletePost}
                                className='px-8 py-2 outline-none border-none rounded-lg bg-blue-text font-semibold text-white'
                            >
                                Delete
                            </button>
                            <button onClick={() => setComfirmDelete(false)}
                                className='px-8 py-2 outline-none border-none rounded-lg bg-blue-text font-normal mt-2 text-white'
                            >
                                Cancel
                            </button>
                        </div>
                    }
                </div>
                <div className='py-2 border-b-[1px] border-border-color cursor-pointer'>
                    <p className='w-full block py-2 text-center text-red-color font-bold text-base'
                        onClick={handleEditPost}
                    >
                        Edit
                    </p>
                </div>
                <div className='py-2 cursor-pointer  border-b-[1px] border-border-color '>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'>
                        Go to post
                    </p>
                </div>
                <div className='py-2 cursor-pointer  border-b-[1px] border-border-color '>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'>
                        Share to...
                    </p>
                </div>
                <div className='py-2 cursor-pointer  border-b-[1px] border-border-color '>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'
                        onClick={handleCopyLinkUrl}
                    >
                        {copy ? 'Copied success!' : 'Copy link'}
                    </p>
                </div>
                <div className='py-2 cursor-pointer  border-b-[1px] border-border-color '>
                    <p className='w-full block py-2 text-center text-gray-color font-normal text-base'>
                        Embed
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

export default OptionPostCardAuth