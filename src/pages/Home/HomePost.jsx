import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useSelector, useDispatch } from 'react-redux';
import { addPostList } from '../../redux/reducers/postReducer';

import PostCard from '../../components/Post/PostCard'
const HomePost = () => {

    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.user.userData)
    const dispatch = useDispatch()

    useEffect(() => {
        const getPosts = async () => {
            try {
                if (user.following.length > 0) {
                    const postRef = collection(db, 'posts')
                    const q = query(postRef, where('userId', 'in', user.following))
                    onSnapshot(q, (querySnapshot) => {
                        let results = []
                        querySnapshot.forEach(doc => {
                            results.push({ ...doc.data(), id: doc.id })
                        })
                        setPosts(results)
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])

    // console.log(posts)

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