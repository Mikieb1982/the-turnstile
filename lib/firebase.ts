// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj_7F_J5I4jMiDhK9mRpw9PRZ9OIA3g0E",
  authDomain: "the-turnstile-89754200-c7f0b.firebaseapp.com",
  projectId: "the-turnstile-89754200-c7f0b",
  storageBucket: "the-turnstile-89754200-c7f0b.firebasestorage.app",
  messagingSenderId: "966585000512",
  appId: "1:966585000512:web:7c7d23632fb247b0c835a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
