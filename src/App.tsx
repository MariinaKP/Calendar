import React from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import firebase from "firebase/compat";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthProvider } from "./AuthContext";
import { auth } from "./firebase-config";



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
                    <a className={'sign-out'} onClick={() => auth.signOut()}>Sign Out</a>
                </div>}
                {!currentUser && <div className={'log-in'}>
                    <Register />
                    <Login />
                </div>}
            </div>
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <div className={'wrapper'}>*/}
            {/*            <Route path={'/'} element={<Calendar/>}/>*/}
            {/*        </div>*/}
            {/*        <div className={'auth'}>*/}
            {/*            <Route path={'/register'} element={<Register/>}/>*/}
            {/*            <Route path={'/login'} element={<Login/>}/>*/}
            {/*        </div>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
        </>
    );
}

export default App;
