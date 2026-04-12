'use client'

import React from 'react'

export default function error({error}:{error:Error}) {
  return (
    <div>
      <h2 className="my-5 text-red-600">
        {error.message}
      </h2>
    </div>
  )
}
