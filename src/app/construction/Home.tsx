'use client'

import React, { useEffect, useState } from 'react'
import { Loading, NavBar } from '../../../components'
import Link from 'next/link'

const Home = () => {
    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoad(false)
        }, 3000)

        return () => clearTimeout(timeoutId)
    },[])
    
    return (
        load ?
        <Loading />
        :
        <main className="flex h-[100vh] overflow-hidden flex-col items-center bg-white dark:bg-base-200">
            <NavBar />
            <div className='h-[100vh] flex flex-col justify-center items-center'>
                <h1 className='text-3xl max-md:text-5xl font-extrabold'>Under Construction</h1>
                <Link href={'/'} className='text-blue underline'>
                    Home
                </Link>
            </div>
        </main>
    )
}

export default Home