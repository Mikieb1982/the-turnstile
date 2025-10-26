
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQn_UqDjEOrCP0iHF0Np3O-2BPGwMkutU",
  authDomain: "the-scrum-book.firebaseapp.com",
  projectId: "the-scrum-book",
  storageBucket: "the-scrum-book.firebasestorage.app",
  messagingSenderId: "99200945430",
  appId: "1:99200945430:web:4daa12ebcc49ca8deed437",
  measurementId: "G-JWM7X668MR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, auth, db, storage, analytics };
