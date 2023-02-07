import React, {useState, ChangeEvent, useContext} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import styles from "./Register.module.scss";
import stylesForm from "../Form/Form.module.scss";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {auth} from '../../firebase-config';


export const Register = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                setError(error);
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
                        {error && <span className={'error'}>There is a registration with this email.</span>}
                    </Form>
                </Modal>
            )}
        </>
    );
};
