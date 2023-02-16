import React, {useEffect, useState} from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {useContext} from "react";
import {AuthContext, AuthProvider} from "./AuthContext";
import {auth} from "./firebase-config";
import {icons} from "./assets/icons";
import {SuccessMessage} from "./components/SuccessMessage/SuccessMessage";


function App() {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    // Check if the user is already logged in
    const user = localStorage.getItem("currentUser");

    if (user) {
      setCurrentUser(user);
      welcomeMessage();
    }
  }, []);
  const welcomeMessage = () => {
    setIsSuccessMessageVisible(true);
    setTimeout(() => {
      setIsSuccessMessageVisible(false);
    }, 2000);
  }

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
              {/*<a className={'sign-out'} onClick={() => auth.signOut()}>Sign Out</a>*/}
            </div>}
        {!currentUser && <div className={'log-in'}>
            <Register/>
            <Login/>
        </div>}
      </div>
      {/*<SuccessMessage>Welcome, ${currentUser.email}</SuccessMessage>*/}
    </AuthProvider>
  );
}

export default App;