"use client";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Initialize Firebase (make sure to replace with your config)
const firebaseConfig = {
  // Your Firebase configuration object
};

const auth = getAuth();

const ResetPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      // Optionally, redirect after a delay
      // setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className='min-h-screen flex items-center justify-center p-4'>
      <div className='flex flex-col md:flex-row rounded-2xl max-w-6xl w-full md:w-auto p-5 bg-white shadow-lg'>
        <div className='flex-1 px-4 md:px-16'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-blue-950 mb-4'>
              Reset your password
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Enter your email'
                    value={email}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <button
                type='submit'
                className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300'
              >
                Reset Password
              </button>
            </form>
            {message && <p className='mt-4 text-green-600'>{message}</p>}
            {error && <p className='mt-4 text-red-600'>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
