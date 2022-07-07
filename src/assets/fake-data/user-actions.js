import {
    faCircleUser,
    faBookmark,
    faGear
} from '@fortawesome/free-solid-svg-icons'

const userActions = [
    {
        icon: faCircleUser,
        name: 'Profile',
        path: '/profile'
    },
    {
        icon: faBookmark,
        name: 'Saved',
        path: '/profile/saved'
    },
    {
        icon: faGear,
        name: 'Setting',
        path: '/setting'
    }
]

export default userActions