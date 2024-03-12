import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { Social } from '../constants'


const Socials = () => {
    return (
        <div className='flex flex-col gap-4 fixed bottom-5 items-end justify-end w-full px-5 z-10'>
            {
                Social.map((item: any, index: number) => (
                    <Link key={index} href={item.link} target='_blank'>
                        <FontAwesomeIcon icon={item.icon} size='2x' className='text-black w-[40px] dark:text-white' />
                    </Link>
                ))
            }
        </div>
    )
}

export default Socials