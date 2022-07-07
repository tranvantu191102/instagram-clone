import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/userReducer'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'

import logoLogin from '../../assets/images/logo-login.png'
import appStoreImg from "../../assets/images/app-store.png"
import ggPlayImg from "../../assets/images/gg-play.png"
import Button from './components/Button'
import Input from './components/Input'
import generatedKeyword from '../../utils/generatedKeyword'

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(true)
    const [disableBtn, setDisableBtn] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleValidUserName = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        setEmailError(regex.test(email))
    }

    useEffect(() => {
        if (username && password && fullname && email) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [username, password, fullname, email])

    const handleRegisterUser = async () => {
        try {
            setLoading(true)
            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            if (user) {
                const keywordFullName = generatedKeyword(fullname)
                const keywordUserName = generatedKeyword(username)
                const search = keywordFullName.concat(keywordUserName)

                const userData = {
                    username,
                    fullname,
                    email,
                    search,
                    id: user.uid,
                    photoURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                }
                await setDoc(doc(db, 'users', user.uid), userData)

                setEmail("")
                setPassword("")
                setFullname("")
                setUsername("")
                setLoading(false)
                dispatch(login(userData.id))
                navigate("/")
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return (
        <div className='w-full bg-second-bg flex flex-col items-center justify-center min-h-screen'>
            <div className='w-[350px] mt-8 bg-primary-bg border-[1px] border-gray-text p-3 flex items-center flex-col justify-center'>
                <img
                    src={logoLogin}
                    alt="logo-login"
                    className='mt-9 mb-3'
                />
                <span className='text-lg mx-8 font-semibold text-gray-text text-center'>
                    Sign up to see photos and videos from your friends.
                </span>
                <div className='flex items-center justify-center w-full px-8'>
                    <div className='h-[1px] flex-1 bg-gray-text'></div>
                    <span className='text-base text-gray-text p-5 '>OR</span>
                    <div className='h-[1px] flex-1 bg-gray-text'></div>
                </div>
                <div className='mt-1 mx-8'>
                    <Input
                        type="text"
                        value={email}
                        error={emailError}
                        text="Email"
                        onChange={(e) => setEmail(e)}
                        onBlur={(e) => handleValidUserName(e)}
                    />
                    <Input
                        type="text"
                        value={fullname}
                        text="Full Name"
                        onChange={(e) => setFullname(e)}
                        error={true}
                    />
                    <Input
                        type="text"
                        value={username}
                        text="User Name"
                        onChange={(e) => setUsername(e)}
                        error={true}
                    />
                    <Input
                        type="password"
                        text="Password"
                        value={password}
                        onChange={(e) => setPassword(e)}
                        error={true}
                    />
                </div>

                <div>
                    <p className='mx-8 text-sm text-gray-text font-normal text-center mt-2'>
                        People who use our service may have uploaded your contact information to Instagram.<a href="https://www.facebook.com/help/instagram/261704639352628"
                            className='mx-8 text-sm text-gray-text font-semibold text-center inline-block'
                        >Learn more
                        </a>
                    </p>
                </div>
                <div className='w-full mt-1 px-8'>
                    <Button
                        name={`${loading ? "Loading..." : "Sign Up"}`}
                        disable={disableBtn}
                        onClick={handleRegisterUser}
                    />
                </div>
            </div>
            <div className='w-[350px] mt-4 bg-primary-bg border-[1px] border-gray-text p-3 flex items-center flex-col justify-center'>
                <p className='text-base text-primary-text py-1'>
                    Have an account? <Link to="/login" className='text-blue-text font-semibold cursor-pointer hover:underline'>
                        Sign in</Link>
                </p>
            </div>
            <span className='text-base text-primary-text mt-2 block'>Get the app.</span>
            <div className='flex items-center justify-center mt-4 mb-2'>
                <img className='w-[136px] mr-4' src={appStoreImg} alt="" />
                <img className='w-[136px]' src={ggPlayImg} alt="" />
            </div>
        </div>
    )
}

export default Register