import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj_7F_J5I4jMiDhK9mRpw9PRZ9OIA3g0E",
  authDomain: "the-turnstile-89754200-c7f0b.firebaseapp.com",
  projectId: "the-turnstile-89754200-c7f0b",
  storageBucket: "the-turnstile-89754200-c7f0b.firebasestorage.app",
  messagingSenderId: "966585000512",
  appId: "1:966585000512:web:1c15b084790bec3ac835a5"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };