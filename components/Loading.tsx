import React from 'react'

const Loading = () => {
  return (
    <main className='flex w-[100vw] bg-white dark:bg-base-200 h-[100vh] items-center justify-center'>
        <span className="loading loading-infinity loading-lg bg-base-200 dark:bg-white"></span>
    </main>
  )
}

export default Loading