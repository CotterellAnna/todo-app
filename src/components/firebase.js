// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

export const db = getFirestore(app)