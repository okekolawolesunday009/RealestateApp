// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNCQxtwDN4VTPA6WjZfooYEsbsk7Ay_V4",
  authDomain: "realestate-react-d496c.firebaseapp.com",
  projectId: "realestate-react-d496c",
  storageBucket: "realestate-react-d496c.appspot.com",
  messagingSenderId: "76357473580",
  appId: "1:76357473580:web:7f507d4f185d5c89c8c889"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);