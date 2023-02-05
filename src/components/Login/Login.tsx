import React, {useState} from "react";
import {Modal} from "../Modal/Modal";
import {Form} from "../Form/Form";
import styles from "./Login.module.scss";
import stylesForm from "../Form/Form.module.scss";

export const Login = () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <button className={`${styles.login_btn} btn`} onClick={() => setIsOpened(true)}>Login</button>
            {isOpened && (
                <Modal onClose={() => setIsOpened(false)}>
                    <Form title={'Login'} button={'Login'}>
                        <input className={stylesForm.field} type={"text"} placeholder={"Email"} required/>
                        <input className={stylesForm.field} type={"password"} placeholder={"Password"} required/>
                    </Form>
                </Modal>
            )}
        </>
    );
};
