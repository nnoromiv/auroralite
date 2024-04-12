"use client"

import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { CopyAddress } from '@/pages/api'
import { FaucetProps } from '../../types'
import Notification from '../Notification'
import { readExcel } from '../../utils/readExcel'
import Button from '../Button'

const Schema = Yup.object().shape({
  address: Yup.string().matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid address')
})

const FileSchema = Yup.object().shape({
  file: Yup.mixed().required(),
})


const Faucet: React.FC<FaucetProps> = ({ account, contractInstance }) => {

  const [airdropStatus, setAirdropStatus] = useState<boolean>(false)
  const [isSingleDrop, setIsSingleDrop] = useState(true)
  const [addressArray, setAddressArray] = useState<string[]>([])
  const [notification, setNotification] = useState({
    type: '',
    message: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contractInstance !== null) {
          const result = await contractInstance._methods.airdropEnabled().call();

          if (result !== null) {
            setAirdropStatus(result)
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  })

  const toggleAirdrop = async () => {
    try {
      const result = await contractInstance._methods.toggleAirdrop().send({ from: account })

      if (result !== null) {
        setAirdropStatus(!airdropStatus)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleFile = async (event: any) => {
    const currentFile = event.target.files[0]
    if (currentFile){
      try {
        const data = await readExcel(currentFile)
        const dataArray: string[] = Object.values(data).flat() as string[];
        setAddressArray(dataArray)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const airdropSingleToken = async (address: string) => {
    try {
      await contractInstance._methods.airdropTokens([address], 100 * 10 ** 18).send({
        from: account,
        to: process.env.NEXT_PUBLIC_AAL_CONTRACT
      })

      setNotification({
        type: 'success',
        message: 'Transaction Completed'
      })

    } catch (error: any) {
      if (error.message.includes('denied transaction')) {
        setNotification({
          type: 'error',
          message: 'Transaction was cancelled'
        })
      } else {
        console.log(error.message)
      }
    }
  }

  const airdropToken = async () => {
    try {
      await contractInstance._methods.airdropTokens(addressArray, 100 * 10 ** 18).send({
        from: account,
        to: process.env.NEXT_PUBLIC_AAL_CONTRACT
      })

      setNotification({
        type: 'success',
        message: 'Transaction Completed'
      })

    } catch (error: any) {
      if (error.message.includes('denied transaction')) {
        setNotification({
          type: 'error',
          message: 'Transaction was cancelled'
        })
      } else {
        setNotification({
          type: 'error',
          message: error.message
        })
      }
    }
  }

  return (
    <div className='bg-blueTint mt-10 mx-40 p-4 rounded-lg border-[2px] border-monadBlue relative dark:bg-blueTint2 dark:border-black max-[1024px]:mx-20 max-[768px]:mx-10 max-[426px]:mx-4'>
      {
        notification.type !== '' && notification.message !== '' &&
        <Notification
          type={notification.type}
          message={notification.message}
        />
      }
      <h1 className='text-white font-bold text-6xl dark:text-base-200 max-[768px]:text-5xl'>Distribute Tokens</h1>
      <Button style='' title='Toggle Airdrop' type='submit' onClick={toggleAirdrop} />
      <div className='flex items-center gap-3 text-white mb-2'>
        <h1 className='text-red-900'>Off</h1>
        <input type="checkbox" className="toggle toggle-primary" checked={airdropStatus} disabled/>
        <h1 className='text-green-900'>On</h1>
      </div>
      <div className='flex items-center gap-3 text-white mb-2'>
        <h1 className='text-red-900'>Single Drop</h1>
        <input type="checkbox" className="toggle toggle-primary" checked={!isSingleDrop} onChange={() => setIsSingleDrop(!isSingleDrop)} />
        <h1 className='text-green-900'>Multi Drop</h1>
      </div>

      <div className='flex mt-2 max-[376px]:w-full flex-row items-center justify-between'>
        {
          account !== '' &&
          <h1
            onClick={() => CopyAddress(account)}
            className='text-[10px]  mx-auto cursor-pointer bg-monadBlue px-3 py-1 rounded-full text-white dark:bg-monadPurple dark:text-black'
          >{account}</h1>
        }
      </div>
      {
        isSingleDrop ?
          <Formik
            initialValues={{
              address: ''
            }}
            onSubmit={i => console.log(i)}
            validationSchema={Schema}
            validateOnChange
          >
            {({ errors, values, isValid }) => (
              <>
                <Form className='mt-5'>
                  <div className='text-red-900 font-bold mb-3'>{errors.address}</div>
                  <Field
                    type='text'
                    name='address'
                    placeholder='0x00000000000000000'
                    required
                    className='input text-black border-white bg-transparent w-full dark:text-white dark:border-base-200'
                  />

                </Form>
                {
                  isValid && !(values.address === '') ?
                    <Button type='submit' onClick={() => airdropSingleToken(values.address)} style='btn-wide w-full my-5 bg-white text-black dark:bg-base-200 dark:text-white' title='Submit' />
                    :
                    <Button type='submit' style='btn-wide w-full my-5 bg-white text-black disabled opacity-30 dark:bg-base-200 dark:text-white' title='Submit' />
                }
              </>
            )}
          </Formik>
          :
          <Formik
            initialValues={{
              file: null,
            }}
            onSubmit={i => console.log(i)}
            validationSchema={FileSchema}
            validateOnChange
          >
            {({ values, isValid }) => (
              <>
                <Form className='mt-5'>
                  <Field
                    type='file'
                    name='file'
                    placeholder=''
                    required
                    className='text-black border-white bg-transparent w-full dark:text-white dark:border-base-200'
                    onChange={handleFile}
                  />
                </Form>
                {
                  !isValid && !(values.file === null) ?
                  <Button type='submit' onClick={() => airdropToken()} style='btn-wide w-full my-5 bg-white text-black dark:bg-base-200 dark:text-white' title='Submit' />
                    :
                  <Button type='submit' style='btn-wide w-full my-5 bg-white text-black disabled opacity-30 dark:bg-base-200 dark:text-white' title='Submit' />
                }
              </>
            )}
          </Formik>
      }
    </div>
  )
}

export default Faucet