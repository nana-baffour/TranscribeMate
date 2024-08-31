// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ-bfP5UoY6A55ZiRqszzL6eL9CE2xprg",
  authDomain: "transcription-app-54d19.firebaseapp.com",
  projectId: "transcription-app-54d19",
  storageBucket: "transcription-app-54d19.appspot.com",
  messagingSenderId: "785523891134",
  appId: "1:785523891134:web:4cf27d63d407b24ed2f7ef",
  measurementId: "G-XR089S3V6Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const firebaseAuth = getAuth(app);
// const analytics = getAnalytics(app);
