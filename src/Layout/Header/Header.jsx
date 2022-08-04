import React from 'react'


import Search from './Search'
import Navigate from './Navigate'
import { Link } from 'react-router-dom'
const Header = () => {



    return (
        <header className='h-header bg-primary-bg border-zinc-300 border-b-[1px] flex items-center justify-center fixed inset-0 z-50'>
            <div className='flex items-center justify-between w-[975px] tab:w-[800px] h-full'>
                <Link to="/" className=' flex items-center'>
                    <div className="logo">

                    </div>
                </Link>
                <Search />
                <Navigate />
            </div>

        </header>
    )
}

export default Header