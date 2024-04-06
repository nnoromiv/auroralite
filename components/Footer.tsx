import { CopyAddress } from '@/pages/api'
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { FooterProps } from '../types'

const Footer: React.FC<FooterProps> = ({ Faucet, Social }) => {
    return (
        <footer className='border-t-[2px] border-t-monadBlue mt-10 mx-10 relative max-[426px]:mx-auto'>
            {
                Social ? <div className='flex justify-evenly mt-5'>
                    <Link href={'https://www.t.me/auroraliteaalchannel/'} target='_blank'>
                        <FontAwesomeIcon fade icon={faTelegram} className='w-[50px] h-[50px] text-monadPurple cursor-pointer relative' />
                    </Link>

                    <Link href={'https://x.com/auroraliteaal'} target='_blank'>
                        <FontAwesomeIcon fade icon={faXTwitter} className='w-[50px] h-[50px] text-monadPurple cursor-pointer' />
                    </Link>

                    <Link href={'https://www.t.me/auroraliteaalgroup/'} target='_blank'>

                        <FontAwesomeIcon fade icon={faTelegram} className='w-[50px] h-[50px] text-monadPurple cursor-pointer' />
                    </Link>
                </div>
                    :
                    <div></div>
            }
            <div className='mt-2 flex flex-col text-center'>
                {
                    Faucet !== undefined &&
                    <h1
                        onClick={() => CopyAddress(Faucet)}
                        className='w-fit max-[376px]:w-full self-center cursor-pointer my-2 text-[10px] bg-monadBlue px-3 py-1 rounded-full text-white dark:bg-monadPurple dark:text-black'
                    >   {Faucet}
                    </h1>
                }
                <h4> Copyright © 2024 Faucet</h4>
            </div>
        </footer>
    )
}

export default Footer