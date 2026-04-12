import React from 'react'
import { SyncLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div>
      <SyncLoader className='text-5xl' />
    </div>
  )
}
