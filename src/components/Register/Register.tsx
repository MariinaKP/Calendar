import React, {useState, ChangeEvent, useContext} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import stylesForm from "../Form/Form.module.scss";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {SuccessMessage} from "../SuccessMessage/SuccessMessage";
import {auth} from '../../firebase-config';
import {AuthContext} from "../../AuthContext";


export const Register = () => {
  const [isOpened, setIsOpened] = useState(false);
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
          <Form title={'Register'} button={'Register'} onClick={onSubmit}>
            <input className={stylesForm.field} type={"email"} placeholder={"Email"} required value={email}
                   onChange={(e) => setEmail(e.target.value)}/>
            <input className={stylesForm.field} type={"password"} placeholder={"Password"} required value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <span className={'error'}>{error}</span>
          </Form>
        </Modal>
      )}
    </>
  );
};
