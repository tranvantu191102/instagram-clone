import Home from "../pages/Home/Home"
import Profile from "../pages/Profile/Profile"
import Conversation from "../pages/Conversation/Conversation"
import Login from "../pages/Login/Login"
import Register from "../pages/Login/Register"
import EditProfile from "../components/Account/EditProfile"
import ProfileUser from "../components/User/ProfileUser"

const publicRouters = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/profile',
        element: Profile
    },
    {
        path: '/conversation',
        element: Conversation
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Register
    },
    {
        path: '/account/edit-profile',
        element: EditProfile
    },
    {
        path: '/profile/:id',
        element: ProfileUser
    },
]

const privateRouters = [

]

export { publicRouters, privateRouters }