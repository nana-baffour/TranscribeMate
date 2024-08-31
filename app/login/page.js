"use client";

import LoginForm from "@/components/LoginForm";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { app } from "../utils/firebaseConfig";
import loginImage from './login.jpg'
import Cookies from 'js-cookie';

app;
let auth = getAuth();
let googleProvider = new GoogleAuthProvider();

const user = getAuth().currentUser;

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        Cookies.set(`isAuth`, "true", { expires: 30 });
        toast.success("login successful");
        router.push("/files");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // useEffect(() => {
  //   if (user || Cookies.get(`isAuth`)) {
  //     router.push("/files");
  //   }
  // }, [user]);

  return (
    <section className='min-h-screen flex items-center justify-center p-4 bg-gray-50'>
      {/* login container */}
      <div className='flex flex-col md:flex-row rounded-2xl max-w-6xl w-full md:w-auto  bg-white shadow'>
        {/* left side */}
        <div className='flex-1 sm:w-[500px] w-auto px-5 sm:px-10 py-12'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-blue-950'>Welcome back!</h2>
            <div className=' flex items-center justify-center gap-1 mb-[42px] '>
              <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                Don't have an account?
              </span>
              <Link
                href='/signup'
                className='text-center text-blue-700 text-base font-medium  leading-[27px]  '
              >
                {"Sign Up"}
              </Link>
            </div>

            <button
              className='flex w-full items-center justify-center gap-3 rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
              onClick={(e) => handleSubmit(e)}
            >
              <FcGoogle className='w-6 h-6 text-md' />
              Continue with Google
            </button>
            <div class="relative my-4">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm font-medium leading-6">
                <span class="bg-white px-6 text-gray-400">Or continue with</span>
              </div>
            </div>

            <LoginForm />
          </div>

          <div class="text-sm text-blue-600 leading-6 text-right">
            <Link
              href={"/resetPassword"}
              className=' border-b border-gray-400'
            >
              Forgot password?
            </Link>
          </div>

        </div>
        {/* right side */}
        <div className=' md:block'>
          <div className='  w-[470px] relative   h-full  overflow-hidden shadow-2xl'>
            <Image
              src={loginImage}
              alt='login image'
              layout='fill'
              objectFit='cover'
              className='rounded-r-lg'
            />
            <div className="absolute w-full opacity-60 h-full bg-blue-950 top-0 left-0"></div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
