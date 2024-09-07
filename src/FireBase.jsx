// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVawYmQgj8HkBuMkG2CyJDATU41yCBYDc",
  authDomain: "e-commerce-store-53216.firebaseapp.com",
  projectId: "e-commerce-store-53216",
  storageBucket: "e-commerce-store-53216.appspot.com",
  messagingSenderId: "198066563316",
  appId: "1:198066563316:web:247708d0acaa66545816a1",
  measurementId: "G-YWMJT9LL49"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 export { auth };
