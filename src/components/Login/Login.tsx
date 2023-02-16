import React, {useContext, useState} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import stylesForm from "../Form/Form.module.scss";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {SuccessMessage} from "../SuccessMessage/SuccessMessage";
import {auth} from '../../firebase-config';
import {AuthContext} from "../../AuthContext";

export const Login = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {currentUser} = useContext(AuthContext);

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
  const welcomeMessage = () => {
    setIsSuccessMessageVisible(true);
    setTimeout(() => {
      setIsSuccessMessageVisible(false);
    }, 2000);
  }

  return (
    <>
      <button className={'btn'} onClick={() => setIsOpened(true)}>Login</button>
      {isOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <Form title={'Login'} button={'Login'} onClick={onLogin}>
            <input className={stylesForm.field} type={"text"} placeholder={"Email"} required
                   onChange={(e) => setEmail(e.target.value)}/>
            <input className={stylesForm.field} type={"password"} placeholder={"Password"} required
                   onChange={(e) => setPassword(e.target.value)}/>
            <span className={'error'}>{error}</span>
          </Form>
        </Modal>
      )}
      {isSuccessMessageVisible && <SuccessMessage>Welcome, {currentUser?.email}</SuccessMessage>}
    </>
  );
};
