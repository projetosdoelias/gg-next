'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { showErrorToast, showSuccessToast } from '@/src/common/utils/toast-message.helper';
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'


export default function Login() {

  const router = useRouter()
  const [user, setUser] = useState({ email: '', password: '', password_confirm: '', name: '' });
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const handleInputChange = (e: any) => {

    const { name, value } = e.target;
    setUser((prevFormulario: any) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const submitLoginForm = async (event: any) => {

    event.preventDefault();
    const defaultErrorMsg = 'Oops! Something went wrong during sign-up. Please try again later.'

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const retorno = await fetch(`/api/session`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })


    if (!retorno) {
      showErrorToast(defaultErrorMsg, 3000)
      return;
    }

    const dataReturn = await retorno.json()
    try {

      if ((retorno?.status === 201 || retorno?.status === 200)) {
        showSuccessToast("Welcome back!");
        router.push('/plants')
        return;
      } else {
        const errorMessage = dataReturn?.message ?? defaultErrorMsg;
        throw new Error(errorMessage);
      }

    } catch (error: any) {
      showErrorToast(error?.message, 3000)
      return;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <form
          onSubmit={submitLoginForm}
          className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              required
              name='password'
              type="password"
              value={user.password}
              onChange={handleInputChange}

              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2 pt-[15px]">
            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
          <div className='content-center text-center'>
            <p className=" pt-[10px] text-[14px] ">Not a member yet? <a onClick={() => { router.push('/signup') }} className='font-bold cursor-pointer' >Sign up and lets grow!</a></p>
          </div>
        </form>
      </div>
    </div>

  )
}
