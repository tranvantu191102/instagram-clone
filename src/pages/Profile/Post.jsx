import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPostCard } from '../../redux/reducers/postReducer';
import { show } from '../../redux/reducers/modalReducer';

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

import Skeleton from '../../components/Skeleton/Skeleton'
import image from '../../assets/images/image.png'

const Post = ({ user, id }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {

        try {
            setLoading(true)
            const postsRef = collection(db, 'posts')
            const q = query(postsRef, where('userId', '==', user.id))
            const unsub = onSnapshot(q, querySnapshot => {
                let data = []
                querySnapshot.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id })
                });
                setPosts(data.reverse())
                setLoading(false)
            })
            return unsub
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [id, user])

    const handleShowPostCard = (post) => {
        dispatch(addPostCard(post))
        dispatch(show('MODAL_POST'))
    }




    return (
        <div className='flex items-center justify-around flex-wrap mt-4 w-full min-h-[100px]'>
            {
                loading ?
                    <>
                        <Skeleton className="w-[290px] h-[290px] mb-7 rounded-lg"></Skeleton>
                        <Skeleton className="w-[290px] h-[290px] mb-7 rounded-lg"></Skeleton>
                    </>
                    :
                    posts && posts.length > 0 ?
                        posts.map((item, index) => (
                            <div
                                key={index}
                                className='bg-center bg-cover bg-no-repeat w-[290px] h-[290px] tab:w-[200px] tab:h-[200px] mb-7 relative'
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
                        :
                        <div className="flex flex-col items-center justify-center">
                            <div className="mt-30 flex flex-col items-center justify-center">
                                <div className='px-6 my-7 py-4 border-[1px] border-black rounded-lg text-xl'>
                                    <img src={image}
                                        className="w-[28px] h-[28px]"
                                        alt="" />
                                </div>
                            </div>
                            <p className='m-auto text-xl text-primary-text font-normal mt-4 mb-10'>
                                No Posts Yet
                            </p>
                        </div>
            }

        </div>
    )
}

export default Post