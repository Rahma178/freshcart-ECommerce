'use client'
import { onlinePayment } from '@/apis/payment/CheckOut'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function CheckOut({cartId}:{cartId:string}) {

  interface formData {
    city: string,
    details:string,
    phone:string
  }

  const { register, handleSubmit } = useForm<formData>()

  async function handleCheckOut(data: formData) {

    const res = await onlinePayment(cartId,data)
    console.log(res)
    if(res.status==="success")
      window.location.href=res.session.url
  }

  return (
    <div>
      <form
        className='w-1/2 mx-auto my-7'
        onSubmit={handleSubmit(handleCheckOut)}
      >
        <input
          {...register('details')}
          className='w-full my-2 border bordet-gray-500 p-3 rounded-2xl'
          placeholder='details'
        />

        <input
          {...register('phone')}
          className='w-full my-2 border bordet-gray-500 p-3 rounded-2xl'
          placeholder='phone'
          type='tel'
        />

        <input
          {...register('city')}
          className='w-full my-2 border bordet-gray-500 p-3 rounded-2xl'
          placeholder='city'
        />

     

        <Button>Send</Button>
      </form>
    </div>
  )
}