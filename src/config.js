import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "tax-accumulate.firebaseapp.com",
    databaseURL: "https://tax-accumulate-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tax-accumulate",
    storageBucket: "tax-accumulate.appspot.com",
    messagingSenderId: "106322829663",
    appId: "1:106322829663:web:abfffe2f39ce5c9a1456ea",
    measurementId: "G-D9SYVDBNGX"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider, db }