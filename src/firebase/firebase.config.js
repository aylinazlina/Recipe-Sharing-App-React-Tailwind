// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT2z5fn8mPB6dtewZL21TvvTRCC8oMHuY",
  authDomain: "recipe-sharing-app-261a8.firebaseapp.com",
  databaseURL: "https://recipe-sharing-app-261a8-default-rtdb.firebaseio.com", // ✅ ADD THIS LINE
  projectId: "recipe-sharing-app-261a8",
  storageBucket: "recipe-sharing-app-261a8.appspot.com", 
  messagingSenderId: "856180107730",
  appId: "1:856180107730:web:6618c1cee16ccb0d4a400b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//todo:for crud operation
export const auth=getAuth(app);
export  const db=getDatabase(app);
export const storage = getStorage(app);


//for crud operation


// todo:Checking firebase
// console.log("firebase is working properly");


export default app;