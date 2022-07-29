import React, { useEffect, useState } from 'react'
import { query, getDocs, limit, collection, where } from "firebase/firestore";
import { db } from '../../firebase/config';

import UserSuggessCard from '../../components/User/UserSuggessCard'
import _ from 'lodash';

const Suggession = ({ user }) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const userRef = collection(db, 'users')
            const q = query(userRef, where('id', '!=', user.id), limit(5))
            const querySnapshot = await getDocs(q)
            const results = []
            querySnapshot.forEach((doc) => {
                results.push(doc.data())
            })
            console.log(results)
            setUsers(results)
        }

        getUsers()
    }, [])


    return (


        <>
            <div className='flex items-center justify-between mt-2'>
                <p className='text-base text-gray-text font-semibold'>Suggestions For You</p>
                <button className='text-sm text-primary-text font-semibold'>See All</button>
            </div>
            <div>
                {
                    users && users.length > 0 &&
                    users.map((item, index) => (
                        <UserSuggessCard key={index} user={item} />
                    ))
                }
            </div>
        </>

    )
}

export default Suggession