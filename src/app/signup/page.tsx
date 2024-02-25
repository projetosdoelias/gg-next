'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { showErrorToast, showSuccessToast } from '@/src/common/utils/toast-message.helper';

export default function Signup() {

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

  const submitContactForm = async (event: any) => {
    event.preventDefault();

    if (!validPasswordAndConfirmPassword()) {
      return;
    }

    const mainUrl = (process.env.URL_API) ? process.env.URL_API : 'http://localhost:3009';

    const data = {
      email: event.target.email.value,
      password: event.target.email.value,
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
    
    if(retorno && (retorno?.status === 201 || retorno?.status === 200)) {
      showSuccessToast("Congratulations! You have successfully registered. Welcome aboard!")
      //@todo fazer redirecionamento
      return;
    }

    const msgError = (retorno?.statusText && retorno?.status !== 500) ? retorno.statusText : 'Oops! Something went wrong during sign-up. Please try again later.'
    showErrorToast(msgError, 3000)

    
    return;

    // Convert the data to JSON format
    const JSONdata = JSON.stringify(data);

    // Define the API endpoint where the form data will be sent
    const endpoint = '/api/submit';

    // Set up options for the fetch request
    const options = {
      method: 'POST', // Use the POST method to send data
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSONdata, // Set the request body to the JSON data
    };

    // Send the form data to the API endpoint using fetch
    const response = await fetch(endpoint, options);

    // Analyse the response data as JSON
    const result = await response.json();

    // Display an alert with the result data (in this case, the submitted email)
    alert(`Please recheck Your E-Mail ID ${result.data}`);
  };

  return (
    <> <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <form
          onSubmit={submitContactForm}
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
