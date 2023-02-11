import React, {useEffect} from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {useContext} from "react";
import {AuthContext} from "./AuthContext";
import {auth} from "./firebase-config";
import {icons} from "./assets/icons";


function App() {
  const {currentUser} = useContext(AuthContext);

  return (
    <>
      <div className={'wrapper'}>
        <Calendar/>
      </div>
      <div className={'auth'}>
        {currentUser &&
            <div className={'logged-in'}>
                <p>{`Welcome, ${currentUser.email}`}</p>
                <icons.GoSignOut />
              <a className={'sign-out'} onClick={() => auth.signOut()}>Sign Out</a>
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