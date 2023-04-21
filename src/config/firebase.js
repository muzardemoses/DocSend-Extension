// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCEbhCignmOhcAfGDOK7_6C9zSo8MkDUb0",
  authDomain: "ansa-workflows-df1f4.firebaseapp.com",
  projectId: "ansa-workflows-df1f4",
  storageBucket: "ansa-workflows-df1f4.appspot.com",
  messagingSenderId: "1045255992311",
  appId: "1:1045255992311:web:b9df06af707dbf8dd474f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// export {
//   app,
//   auth,
//   provider,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
// };