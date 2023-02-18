import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

// TODO env variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "calendar-4c102.firebaseapp.com",
    projectId: "calendar-4c102",
    storageBucket: "calendar-4c102.appspot.com",
    messagingSenderId: "653588961584",
    appId: "1:653588961584:web:225eca8e2ad8fdd92450f5",
    measurementId: "G-4NL3LZYL2E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const db = getFirestore(app);

// connectFirestoreEmulator(db, 'localhost', 8080);
export default app;