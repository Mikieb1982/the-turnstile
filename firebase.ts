import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQn_UqDjEOrCP0iHF0Np3O-2BPGwMkutU",
  authDomain: "the-scrum-book.firebaseapp.com",
  projectId: "the-scrum-book",
  storageBucket: "the-scrum-book.firebasestorage.app",
  messagingSenderId: "99200945430",
  appId: "1:99200945430:web:4daa12ebcc49ca8deed437",
  measurementId: "G-JWM7X668MR"
};

// Initialize Firebase if it hasn't been already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence().catch((err) => {
    if (err.code === 'failed-precondition') {
        // This can happen if multiple tabs are open.
        console.warn('Firestore persistence failed: Multiple tabs open.');
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence.
        console.warn('Firestore persistence is not supported in this browser.');
    }
});

export default firebase;
