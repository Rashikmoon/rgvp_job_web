// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDjkbivSVY327ju2zfiYO8tVXfR6BmM-Hc",
  authDomain: "vite-job.firebaseapp.com",
  projectId: "vite-job",
  storageBucket: "vite-job.appspot.com",
  messagingSenderId: "410117380163",
  appId: "1:410117380163:web:c8b3430840981f2fdd1cf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
export {db,auth,storage};