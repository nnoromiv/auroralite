'use client'

import React from 'react'
import { Hero, NavBar, Socials } from '../../components'
import ModeSwitch from './ModeSwitcher'
import Link from 'next/link'

const Home = () => {
    return (
        <main className="flex min-h-screen overflow-hidden flex-col items-center justify-between bg-white dark:bg-base-200">
            <NavBar />
            <ModeSwitch />
            <Socials />
            <Hero />
            <div className='fixed bottom-3 z-50 flex flex-row gap-3 max-pn:hidden text-center'>
                <Link href={'https://bscscan.com/token/0x13Ff78AacA7dc307eE944127C6D617bA949D491A'}>
                    <h1 className='underline font-bold cursor-pointer'>Bsc Scan</h1>
                </Link>
                <Link href={'https://pancakeswap.com/0x13Ff78AacA7dc307eE944127C6D617bA949D491A'}>
                    <h1 className='underline font-bold cursor-pointer'>Pancake Swap</h1>
                </Link>
                <Link href={'mailTo:auroraliteaal@proton.me'}>
                    <h1 className='underline font-bold cursor-pointer'>Official Mail</h1>
                </Link>
            </div>
        </main>
    )
}

export default Home