import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useSelector } from 'react-redux';
import SkeletonPostCard from '../../components/Post/SkeletonPostCard';

import PostCard from '../../components/Post/PostCard'
import telescopeImage from '../../assets/images/telescope.png'
const HomePost = () => {

    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.user.userData)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                if (user.following.length > 0) {
                    const postRef = collection(db, 'posts')
                    const q = query(postRef, where('userId', 'in', user.following))
                    onSnapshot(q, (querySnapshot) => {
                        let results = []
                        querySnapshot.forEach(doc => {
                            results.push({ ...doc.data(), id: doc.id })
                        })
                        setPosts(results)
                        setLoading(false)
                    })
                } else {
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getPosts()
    }, [])



    return (
        <div>
            {
                loading ?
                    <>
                        <SkeletonPostCard />
                        <SkeletonPostCard />
                        <SkeletonPostCard />
                    </>
                    :

                    posts && posts.length > 0 ?
                        posts.map((item, index) => (
                            <div key={index}>
                                <PostCard post={item} />
                            </div>
                        ))
                        :
                        <div className="h-[calc(100vh-60px)] flex ">
                            <div className="w-[350px] mt-10 h-[500px] flex items-center justify-center bg-primary-bg rounded-2xl">
                                <img
                                    src={telescopeImage}
                                    alt=""
                                    className='w-[200px] '
                                />
                                <span className=' text-xl font-bold text-red-color'>
                                    Let's explore Instagram
                                </span>
                            </div>
                        </div>

            }
        </div>
    )
}

export default HomePost