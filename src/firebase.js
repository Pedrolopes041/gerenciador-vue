// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: "vue-firebase-crud-c10d9.firebaseapp.com",
  projectId: "vue-firebase-crud-c10d9",
  storageBucket: "vue-firebase-crud-c10d9.appspot.com",
  messagingSenderId: "409170682784",
  appId: "1:409170682784:web:73179085a441857c277ac5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);