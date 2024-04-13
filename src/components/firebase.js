// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider, browserSessionPersistence, setPersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBa48sJ4IWAGbqI6UEZFCxaQny0VcShhjE",
  authDomain: "todo-c1abd.firebaseapp.com",
  projectId: "todo-c1abd",
  storageBucket: "todo-c1abd.appspot.com",
  messagingSenderId: "1031523356488",
  appId: "1:1031523356488:web:e434bedc7c7743367aad7d",
  measurementId: "G-8H83PY55P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
setPersistence(auth, browserSessionPersistence);

export const db = getFirestore(app)