import React, {useState, ChangeEvent, useContext} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import {Login} from "../Login/Login";
import styles from "./Register.module.scss";
import stylesForm from "../Form/Form.module.scss";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase-config';

type Props = {
  onClose?: () => void;
};


export const Register = ({onClose}: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoginOpened, setIsLoginOpened] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        if(error.message === 'Firebase: Error (auth/invalid-email).') setError('Invalid email!');
        if(error.message === 'Firebase: Error (auth/email-already-in-use).') setError('Email already used!');
      });
  }

  return (
    <>
      <button className={'btn'} onClick={() => setIsOpened(true)}>Register</button>
      {isOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <div className={styles.register}>
            <Form title={'Register'} button={'Register'} onClick={onSubmit}>
              <input className={stylesForm.field} type={"email"} placeholder={"Email"} required value={email}
                     onChange={(e) => setEmail(e.target.value)}/>
              <input className={stylesForm.field} type={"password"} placeholder={"Password"} required value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
              <span className={'error'}>{error}</span>
            </Form>
            <span className={styles.login_link}>Already have an account?
              <a onClick={() => setIsLoginOpened(true)}>Log in.</a>
            </span>
            <div className={styles.login_link}>Already have an account? <a onClick={onClose}>Log in.</a></div>
          </div>
        </Modal>
      )}
      {isLoginOpened && <Login onRegisterClick={() => setIsLoginOpened(true)} />}
    </>
  );
};
