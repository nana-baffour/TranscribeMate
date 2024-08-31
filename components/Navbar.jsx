"use client";

import Link from "next/link";

import { firebaseAuth } from "@/app/utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { FcMenu } from "react-icons/fc";
import { MdClose } from "react-icons/md";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Navbar = ({ }) => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  const links = [
    { href: "/files", label: "Recordings", show: !pathname.startsWith("/files") && user },
    { href: "/about", label: "pricing", show: true },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const router = useRouter();

  const handleSignOut = async (e) => {
    try {
      await signOut(firebaseAuth);
      Cookies.remove("isAuth");
      toast.success("Logout successfully");
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  console.log(Cookies.get("isAuth"));

  return (
    <nav className='px-6 pt-2 bg-blue-950 sticky top-0 w-full z-[9999]  '>
      <section
        className={`navbar mx-w-3xl mx-auto mb-0 flex-col sm:flex-row   sm:justify-between   `}
      >
        <Link
          href={"/"}
          className='bg-blue-950 pl-0 sm:px-3 py-4 rounded-lg self-start sm:self-center text-white'
        >
          <h2>TranscribeMATE</h2>
        </Link>

        <FcMenu
          className={`text-3xl cursor-pointer sm:hidden absolute right-8 top-7 ${isMenuOpen ? "hidden" : "block"
            }`}
          onClick={() => setIsMenuOpen(true)}
        />

        <MdClose
          className={`text-3xl cursor-pointer sm:hidden absolute right-8 top-7 ${isMenuOpen ? "block" : "hidden"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <ul
          className={`flex-col gap-6 sm:flex-row sm:items-center md:ml-8 text-md text-white ${isMenuOpen
            ? "top-[100%] sm:relative"
            : "absolute top-[-200%] sm:relative"
            } `}
        >
          {links
            .filter((link) => link.show)
            .map((link) => {
              const isActive = pathname?.startsWith(link?.href);

              return (
                <li
                  key={link.href}
                  className={isActive ? "text-teal-300" : "text-white"}
                >
                  <Link href={link.href} className='my-2 capitalize'>
                    {link.label}
                  </Link>
                </li>
              );
            })}
        </ul>
        <div
          className={`flex-col sm:flex-row  items-center justify-between gap-6 hidden sm:flex   ${isMenuOpen
            ? "top-[100%] sm:relative"
            : "absolute top-[-200%] sm:relative"
            }`}
        >
          {(user) ? (
            <button
              onClick={handleSignOut}
              className='bg-teal-400 hover:opacity-90 text-white text-sm px-8 py-2 rounded-sm'
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href={"/login"}
                className='flex bg-blue-950 text-sm border border-teal-300 px-8 hover:opacity-80 text-teal-300 py-2  rounded-sm'
              >
                Log In
              </Link>
              <Link
                href={"/signup"}
                className='bg-teal-400 hover:opacity-90 text-white text-sm px-8 py-2 rounded-sm'
              >
                Sign Up
              </Link>
            </>
          )}

          {(user) &&
            <button className='cursor-pointer' onClick={openModal}>
              <span className='inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100'>
                <svg
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='h-full w-full text-gray-300'
                >
                  <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
              </span>
            </button>}

          {user && isModalOpen && (
            <div
              className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
    transition-all duration-300 ease-in-out delay-1000'
            >
              <div
                className='bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto 
      transition-all duration-300 ease-in-out delay-1000'
              >
                <div className=''>
                  <div className='px-4 sm:px-0 flex justify-between'>
                    <h3 className='text-base font-semibold leading-7 text-gray-900'>
                      User Information
                    </h3>

                    <button className='size-8 rounded-full bg-gray-300 flex items-center justify-center'>
                      <MdClose onClick={closeModal} />
                    </button>
                  </div>
                  <div className='mt-6 border-t border-gray-100'>
                    <dl className='divide-y divide-gray-100'>
                      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>
                          Full name
                        </dt>
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                          {user.displayName}
                        </dd>
                      </div>

                      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>
                          Email address
                        </dt>
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                          {user.email}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
