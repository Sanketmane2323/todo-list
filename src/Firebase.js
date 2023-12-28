// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeMQz9wXX3_U5F1Bo7omoGquKLDWnYg58",
  authDomain: "todo-list-a956e.firebaseapp.com",
  projectId: "todo-list-a956e",
  storageBucket: "todo-list-a956e.appspot.com",
  messagingSenderId: "692435833864",
  appId: "1:692435833864:web:98f82b910c098921e96dbd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)