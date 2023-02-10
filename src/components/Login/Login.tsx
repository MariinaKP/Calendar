import React, {useContext, useState} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import styles from "./Login.module.scss";
import stylesForm from "../Form/Form.module.scss";
import { signInWithEmailAndPassword, getAuth, signOut} from 'firebase/auth';
import { auth } from '../../firebase-config';
import {SuccessMessage} from "../SuccessMessage/SuccessMessage";
import {AuthContext} from "../../AuthContext";

export const Login = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const onLogin = (e: any): void => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsOpened(false);
            })
            .catch((error) => {
                setError(error)
            });
        welcomeMessage();
    };
    const welcomeMessage = () => {
        setIsSuccessMessageVisible(true);
        setTimeout(() => {
            setIsSuccessMessageVisible(false);
        }, 2000);
    }

    return (
        <>
            <button className={`${styles.login_btn} btn`} onClick={() => setIsOpened(true)}>Login</button>
            {isOpened && (
                <Modal onClose={() => setIsOpened(false)}>
                    <Form title={'Login'} button={'Login'} onClick={onLogin}>
                        <input className={stylesForm.field} type={"text"} placeholder={"Email"} required onChange={(e)=>setEmail(e.target.value)}/>
                        <input className={stylesForm.field} type={"password"} placeholder={"Password"} required onChange={(e)=>setPassword(e.target.value)}/>
                        {error && <span className={'error'}>Wrong email or password</span>}
                    </Form>
                </Modal>
            )}
            {isSuccessMessageVisible && <SuccessMessage>Welcome, {currentUser.email}</SuccessMessage>}
        </>
    );
};
