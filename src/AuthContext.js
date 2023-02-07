import React, { useState, useEffect } from "react";
import { auth } from "./firebase-config";
//Use one which works fine for you //

import * as firebase from "firebase/app";
// import * as firebase from 'firebase';

//Now import this
import 'firebase/firestore';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    );
}