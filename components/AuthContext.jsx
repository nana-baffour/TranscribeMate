"use client";

import { app } from "@/app/utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
app;

import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

let auth = getAuth();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user is", user);

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
