import React from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";

function App() {
    return (
        <>
            <div className={'wrapper'}>
                <Calendar/>
            </div>
            <div className={'auth'}>
                <Register />
                <Login />
            </div>
        </>
    );
}

export default App;
