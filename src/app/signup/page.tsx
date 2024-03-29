'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { showErrorToast, showSuccessToast } from '@/src/common/utils/toast-message.helper';
import { useRouter } from 'next/navigation'


export default function Signup() {

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

  const validPasswordAndConfirmPassword = (): boolean => {
    if (user.password !== user.password_confirm) {
      showErrorToast("Password and Confirm Password do not match. Please make sure your passwords match.")
      return false;
    }
    return true;
  }

  const submitSignUpForm = async (event: any) => {

    event.preventDefault();

    if (!validPasswordAndConfirmPassword()) {
      return;
    }

    const mainUrl = (process.env.URL_API) ? process.env.URL_API : 'http://localhost:3009';
    const defaultError = 'Oops! Something went wrong during sign-up. Please try again later.'

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      name: event.target.name.value,
    };

    const retorno = await fetch(`${mainUrl}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if (retorno) {
      try {
        const dataReturn = await retorno.json()

        if ((retorno?.status === 201 || retorno?.status === 200)) {
          showSuccessToast("Congratulations! You have successfully registered. Welcome back")
          router.push('/login')
          return;
        }

        const serverErrorMsg = dataReturn?.message || defaultError
        showErrorToast(serverErrorMsg, 3000)
        return;
      } catch (error) {
        showErrorToast(defaultError, 3000)
      }
    }

    showErrorToast(defaultError, 3000)

    return;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 onClick={() => { router.push('/') }} className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <form
          onSubmit={submitSignUpForm}
          className="mt-6">

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="input"
              required
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

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

          <div className="mb-2">
            <label
              htmlFor="password_confirm"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              required
              name='password_confirm'
              value={user.password_confirm}
              onChange={handleInputChange}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2 pt-[15px]">
            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}
