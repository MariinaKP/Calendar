import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO env variables
const firebaseConfig = {
    apiKey: "AIzaSyBmIABp4_IgB7Xm4rBTWLnW-UGB5TW5D9I",
    authDomain: "calendar-4c102.firebaseapp.com",
    projectId: "calendar-4c102",
    storageBucket: "calendar-4c102.appspot.com",
    messagingSenderId: "653588961584",
    appId: "1:653588961584:web:225eca8e2ad8fdd92450f5",
    measurementId: "G-4NL3LZYL2E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;