// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT2z5fn8mPB6dtewZL21TvvTRCC8oMHuY",
  authDomain: "recipe-sharing-app-261a8.firebaseapp.com",
  projectId: "recipe-sharing-app-261a8",
  storageBucket: "recipe-sharing-app-261a8.firebasestorage.app",
  messagingSenderId: "856180107730",
  appId: "1:856180107730:web:6618c1cee16ccb0d4a400b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// todo:Checking firebase
// console.log("firebase is working properly");


export default app;