import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPostCard, showModalPostCard } from '../../redux/reducers/postReducer';
import { show } from '../../redux/reducers/modalReducer';

import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

const Post = (props) => {

    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const { user } = props
    useEffect(() => {
        const postsRef = collection(db, 'posts')
        const q = query(postsRef, where('userId', '==', user.id))
        const unsub = onSnapshot(q, querySnapshot => {
            let data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            setPosts(data.reverse())
        })

    }, [])

    const handleShowPostCard = (post) => {
        dispatch(addPostCard(post))
        dispatch(show('MODAL_POST'))
    }


    return (
        <div className='flex items-center justify-around flex-wrap mt-4 w-full min-h-[100px]'>
            {
                posts && posts.length > 0 &&
                posts.map((item, index) => (
                    <div
                        key={index}
                        className='bg-center bg-cover bg-no-repeat w-[290px] h-[290px] mb-7 relative'
                        style={{ backgroundImage: `url(${item.arrImg[0].photoURL})` }}

                    >
                        <div className='absolute inset-0 group cursor-pointer' >
                            <div className='absolute inset-0 bg-primary-text opacity-0 invisible group-hover:visible group-hover:opacity-50'
                                onClick={() => handleShowPostCard(item)}
                            >
                            </div>
                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible opacity-0 
                            group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-linear'>
                                <span className='text-2lg text-white-text font-semibold mr-4'>
                                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                                    {item.like.length}
                                </span>
                                <span className='text-2lg text-white-text font-semibold'>
                                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                                    {item.comment ? item.comment.length : 0}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Post