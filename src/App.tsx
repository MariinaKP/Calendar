import React, {useEffect, useState} from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {useContext} from "react";
import {AuthContext, AuthProvider} from "./AuthContext";
import {auth} from "./firebase-config";
import {icons} from "./assets/icons";


function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthProvider>
      <div className={'wrapper'}>
        <Calendar/>
      </div>
      <div className={'auth'}>
        {currentUser &&
            <div className={'logged-in'}>
                <p>{currentUser.email}</p>
                <icons.GoSignOut onClick={() => auth.signOut()}/>
            </div>}
        {!currentUser && <div className={'log-in'}>
            <Register/>
            <Login/>
        </div>}
      </div>
    </AuthProvider>
  );
}

export default App;