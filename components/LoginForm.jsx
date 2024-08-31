"use client";

import { formatFirebaseAuthError } from "@/app/utils/error";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

import { toast } from "sonner";

const LoginForm = () => {
  let router = useRouter();
  let auth = getAuth();
  const [data, setData] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        Cookies.set(`isAuth`, "true", { expires: 30 });
        toast.success("Login successful");

        router.push("/files");
      })
      .catch((err) => {
        const errorMessage = formatFirebaseAuthError(err);
        toast.error(errorMessage);
        console.log(errorMessage);

        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          router.push("/files");
        }
      });
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      {/* <label htmlFor='name' className='flex start-2 my-2 text-xs'>
        Name
      </label>
      <input
        className='px-4 py-3 border-2  mb-4 text-xs'
        type='text'
        id='name'
        placeholder='Enter your name'
        value={data.name || ""}
        onChange={(e) => handleInput(e)}
        required
      /> */}
      <label htmlFor='email' className='flex start-2 my-2 text-md text-gray-900'>
        Email
      </label>
      <input
        className='px-4 py-2 border-2  mb-4 text-sm rounded bg-white'
        type='email'
        name='email'
        id='email'
        placeholder='Enter your email'
        value={data.email || ""}
        onChange={(e) => handleInput(e)}
        required
      />

      <label htmlFor='password' className='flex start-2 my-2 text-md text-gray-900'>
        Password
      </label>

      <input
        className='px-4 py-2 border-2  mb-4 text-sm rounded bg-white'
        type='password'
        name='password'
        id='password'
        placeholder='Enter your password'
        value={data.password || ""}
        onChange={(e) => handleInput(e)}
        required
      />

      {/* <MdOutlineRemoveRedEye className='fill-slate-500 ' /> */}

      <button
        type='submit'
        className='text-sm py-2.5 px-5 mt-5 block w-full mb-3 border-teal-300 bg-blue-950 border text-teal-300 hover:border-teal-200 hover:text-teal-200 transition ease-in-out delay-75'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
