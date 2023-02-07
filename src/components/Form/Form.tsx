import styles from "./Form.module.scss";
import {unstable_Blocker} from "react-router-dom";

type Props = {
    title: string;
    button: string;
    onClick?: (e: any) => void;
    children?: React.ReactNode;
};

export const Form = ({ title, button, onClick, children }: Props) => {
    return (
        <form className={styles.form}>
            <h4>{title}</h4>
            <div className={styles.form_fields}>
                {children}
            </div>
            <button className={`${styles.form_btn} btn`} onClick={onClick}>{button}</button>
        </form>
    );
};

