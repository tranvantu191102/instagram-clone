import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/userReducer'
import { doc, setDoc } from 'firebase/firestore'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo
} from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


import logoLogin from '../../assets/images/logo-login.png'
import appStoreImg from "../../assets/images/app-store.png"
import ggPlayImg from "../../assets/images/gg-play.png"
import Button from './components/Button'
import Input from './components/Input'
import generatedKeyword from '../../utils/generatedKeyword'

const provider = new FacebookAuthProvider();
const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [disableBtn, setDisableBtn] = useState(true)
    const [emailError, setEmailError] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (username && password) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [username, password])


    const handleValidUserName = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        setEmailError(regex.test(email))
    }

    const handleLoginWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            if (result) {
                // const { displayName, photoURL, email, uid } = user
                const { displayName, photoURL, email, uid } = result.user
                const { isNewUser } = getAdditionalUserInfo(result)
                dispatch(login(uid))

                if (!isNewUser) return

                const search = generatedKeyword(displayName)
                await setDoc(doc(db, 'users', uid), {
                    username: email,
                    fullname: displayName,
                    email,
                    photoURL,
                    id: uid,
                    search,
                    followers: [],
                    following: [],
                    posts: 0,
                })
            }
        } catch (error) {
            setErrorLogin(true)
            setLoading(false)
            console.log(error)
        }
    }

    const hanldeLoginUser = async () => {
        try {
            setLoading(true)
            const { user } = await signInWithEmailAndPassword(auth, username, password)
            if (user) {
                setUsername("")
                setPassword("")
                dispatch(login(user.uid))
                setErrorLogin(false)
                setLoading(false)
                navigate("/")
            } else {
                setErrorLogin(true)
                setLoading(false)
            }
        } catch (error) {
            setErrorLogin(true)
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/")
            }
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <div className='w-full bg-second-bg flex flex-col items-center justify-center min-h-screen'>
            <div className='w-[350px] mt-8 bg-primary-bg border-[1px] border-gray-text p-3 flex items-center flex-col justify-center'>
                <img
                    src={logoLogin}
                    alt="logo-login"
                    className='mt-9 mb-3'
                />
                <div className='mt-10 mx-8'>
                    <Input
                        type="text"
                        value={username}
                        error={emailError}
                        text="Phone number, username or email"
                        onChange={(e) => setUsername(e)}
                        onBlur={(e) => handleValidUserName(e)}
                    />
                    <Input
                        type="password"
                        text="Password"
                        error={true}
                        value={password}
                        onChange={(e) => setPassword(e)}
                    />
                    {
                        errorLogin && <p className='text-base text-red-500 mb-1 font-normal'>Email or password is wrong!</p>
                    }
                </div>
                <div className='w-full mt-1 px-8'>
                    {
                        loading ?
                            <div className="w-full flex items-center justify-center py-1 bg-blue-text rounded-md">
                                <svg className="animate-spin h-5 w-5 mr-3 ... text-white-text" viewBox="0 0 24 24">
                                    <FontAwesomeIcon icon={faSpinner} />
                                </svg>
                            </div> :
                            <Button
                                name="Log In"
                                disable={disableBtn}
                                onClick={hanldeLoginUser}
                            />
                    }

                </div>
                <div className='flex items-center justify-center w-full px-8'>
                    <div className='h-[1px] flex-1 bg-gray-text'></div>
                    <span className='text-base text-gray-text p-5 '>OR</span>
                    <div className='h-[1px] flex-1 bg-gray-text'></div>
                </div>
                <div className='w-full px-8'>
                    <Button
                        name="Log in with Facebook"
                        onClick={handleLoginWithFacebook}
                    />
                </div>
                <div className='mt-10'>
                    <span className='text-sm text-primary-text hover:underline cursor-pointer'>Forgot password?</span>
                </div>
            </div>
            <div className='w-[350px] mt-4 bg-primary-bg border-[1px] border-gray-text p-3 flex items-center flex-col justify-center'>
                <p className='text-base text-primary-text py-1'>
                    Don't have an account? <Link to="/register" className='text-blue-text font-semibold cursor-pointer hover:underline'>
                        Sign up</Link>
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

export default Login