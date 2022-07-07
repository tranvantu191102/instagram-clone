import React from 'react'

import footer from '../assets/fake-data/footer'

const Footer = () => {



    return (
        <div>
            <ul className='flex items-center justify-center'>
                {
                    footer.map((item, index) => (
                        <li key={index}
                            className="mr-2"
                        >
                            <a href={item.path}
                                className="text-sm text-gray-text font-normal p-2"
                            >
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <p className='text-sm text-gray-text font-normal mt-3 text-center'>
                &#169; 2022 Instagram from Meta
            </p>
        </div>
    )
}

export default Footer