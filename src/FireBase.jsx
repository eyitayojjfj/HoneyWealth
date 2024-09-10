// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFU0IF0C3DvTHjdW76NeHNyp7KJ1w0T3Q",
  authDomain: "honeywealth-store.firebaseapp.com",
  projectId: "honeywealth-store",
  storageBucket: "honeywealth-store.appspot.com",
  messagingSenderId: "621774129254",
  appId: "1:621774129254:web:0daa7ac5c05e79caed85a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export const db = getFirestore(app);

 export { auth };
