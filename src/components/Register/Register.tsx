import React, {useState, ChangeEvent} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import styles from "./Register.module.scss";
import stylesForm from "../Form/Form.module.scss";
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";


export const Register = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    // const navigate = useNavigate();

    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // navigate("/");
                // ...
            })
            .catch((error) => {
                setError(error);
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log(errorCode, errorMessage);
                // ..
            });
    }
    return (
        <>
            <button className={`${styles.login_btn} btn`} onClick={() => setIsOpened(true)}>Register</button>
            {isOpened && (
                <Modal onClose={() => setIsOpened(false)}>
                    <Form title={'Register'} button={'Register'} onClick={onSubmit}>
                        <input className={stylesForm.field} type={"email"} placeholder={"Email"} required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className={stylesForm.field} type={"password"} placeholder={"Password"} required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <span className={'error'}>Wrong email</span>}
                    </Form>
                </Modal>
            )}
        </>
    );
};
