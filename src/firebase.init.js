// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDU5e4-HBMTZYPeogVg7UqU-LEm6pIGFww",
//   authDomain: "forevision-digital-6b38a.firebaseapp.com",
//   projectId: "forevision-digital-6b38a",
//   storageBucket: "forevision-digital-6b38a.appspot.com",
//   messagingSenderId: "895081804653",
//   appId: "1:895081804653:web:a0adc887667674a6ffa064",
//   measurementId: "G-T8KEJLT2FL",
// };

const firebaseConfig = {
  apiKey: "AIzaSyB8ORtnUmu2cQ0dxHX2Xl8BheNLGclb1Zc",
  // authDomain: "forevisiondigital.com",
  authDomain: "forevision-digital-43161.firebaseapp.com",
  projectId: "forevision-digital-43161",
  storageBucket: "forevision-digital-43161.appspot.com",
  messagingSenderId: "209383096809",
  appId: "1:209383096809:web:e4f7537b560beb98a80b78",
  measurementId: "G-42LT5XDG4B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
