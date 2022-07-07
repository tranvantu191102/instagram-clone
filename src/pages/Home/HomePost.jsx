import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useSelector } from 'react-redux';

import PostCard from '../../components/Post/PostCard'
const HomePost = () => {

    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.user.userData)
    useEffect(() => {
        const getPosts = async () => {
            try {
                if (user.following.length > 0) {
                    const postRef = collection(db, 'posts')
                    const q = query(postRef, where('userId', 'in', user.following))
                    const querySnapshot = await getDocs(q)
                    let results = []
                    querySnapshot.forEach(doc => {
                        results.push(doc.data())
                    })
                    setPosts(results)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])

    console.log(posts)

    return (
        <div>
            {
                posts && posts.length > 0 &&
                posts.map((item, index) => (
                    <div key={index}>
                        <PostCard post={item} />
                    </div>
                ))
            }
        </div>
    )
}

export default HomePost