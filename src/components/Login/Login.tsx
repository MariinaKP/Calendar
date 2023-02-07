import React, {useState} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import styles from "./Login.module.scss";
import stylesForm from "../Form/Form.module.scss";
import { signInWithEmailAndPassword, getAuth, signOut} from 'firebase/auth';
import { auth } from '../../firebase-config';
import {NavLink, redirect, useNavigate} from 'react-router-dom'

export const Login = () => {
    const [isOpened, setIsOpened] = useState(false);

    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e: any): void => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setIsOpened(false);
                // navigate("/home")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    };

    const onLogout = () => {
        signOut(auth);
    };

    return (
        <>
            <button className={`${styles.login_btn} btn`} onClick={() => setIsOpened(true)}>Login</button>
            {isOpened && (
                <Modal onClose={() => setIsOpened(false)}>
                    <Form title={'Login'} button={'Login'} onClick={onLogin}>
                        <input className={stylesForm.field} type={"text"} placeholder={"Email"} required onChange={(e)=>setEmail(e.target.value)}/>
                        <input className={stylesForm.field} type={"password"} placeholder={"Password"} required onChange={(e)=>setPassword(e.target.value)}/>
                    </Form>
                </Modal>
            )}
        </>
    );
};
