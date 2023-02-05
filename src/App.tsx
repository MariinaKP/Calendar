import React from 'react';
import "./styles/main.scss";
import {Calendar} from "./components/Calendar/Calendar";
import {Login} from "./components/Login/Login";

function App() {
    return (
        <>
            <div className={'wrapper'}>
                <Calendar/>
            </div>
            <Login/>
        </>

    );
}

export default App;
