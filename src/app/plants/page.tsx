'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { showErrorToast, showSuccessToast } from '@/src/common/utils/toast-message.helper';
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'


export default function Plants() {

  const router = useRouter()
  
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        Do your job! About plants!
      </div>
    </div>

  )
}
