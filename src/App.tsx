import React from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import firebase from "firebase/compat";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser.email)
    // const RequireAuth = ({ children: JSX.Element }) => {
    //     return currentUser ? children : <Navigate to="/login" />;
    // };

    return (
        <>
            <div className={'wrapper'}>
                <Calendar/>
            </div>
            <div className={'auth'}>
                <Register />
                {currentUser && <p>Hello{currentUser}</p>}
                <Login />
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
