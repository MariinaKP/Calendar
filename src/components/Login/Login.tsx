import React, {useState} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import {Register} from "../Register/Register";
import styles from "./Login.module.scss";
import stylesForm from "../Form/Form.module.scss";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase-config';

type Props = {
  onRegisterClick?: () => void;
};


export const Login = ({onRegisterClick}: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isRegisterOpened, setIsRegisterOpened] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = (e: any): void => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsOpened(false);
      })
      .catch((error) => {
        setError('Wrong email or password');
      });
  };

  return (
    <>
      <button className={'btn'} onClick={() => setIsOpened(true)}>Login</button>
      {isOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <div className={styles.login}>
            <Form title={'Login'} button={'Login'} onClick={onLogin}>
              <input className={stylesForm.field} type={"text"} placeholder={"Email"} required
                     onChange={(e) => setEmail(e.target.value)}/>
              <input className={stylesForm.field} type={"password"} placeholder={"Password"} required
                     onChange={(e) => setPassword(e.target.value)}/>
              <span className={'error'}>{error}</span>
            </Form>
            <div className={styles.register_link}>
              Don't have an account? <a onClick={onRegisterClick}>Register.</a>
            </div>
          </div>
        </Modal>
      )}
      {isRegisterOpened && <Register onClose={() => setIsRegisterOpened(false)} />}
    </>
  );
};
