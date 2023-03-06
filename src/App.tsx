import React, {useEffect, useState} from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {ThemeSelector} from "./components/ThemeSelector/ThemeSelector";
import {useContext} from "react";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {auth} from "./firebase-config";
import {icons} from "./assets/icons";
import {ThemeContext} from "./context/ThemeContext";
import {Auth} from "./components/Auth/Auth";


function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <ThemeSelector/>
      <div className={'wrapper'}>
        <Calendar/>
      </div>
      <div className={'auth'}>
        {currentUser &&
            <div className={'logged-in'}>
                <p>{currentUser.email}</p>
                <icons.GoSignOut className={'sign-out'} onClick={() => auth.signOut()}/>
            </div>}
        {!currentUser && <div className={'log-in'}>
            <Register/>
            <Login/>
        </div>}
      </div>
    </>
  );
}

export default App;