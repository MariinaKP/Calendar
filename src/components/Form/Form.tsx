import styles from "./Form.module.scss";
import {Backdrop} from "../Modal/Backdrop";

type Props = {
    title: string;
    button: string;
    children?: React.ReactNode;
};

/*
export const Form = () => {
    return (
        <form className={styles.form}>
            <h4>Add Task</h4>
            <input className={styles.field} type={"text"} placeholder={"Title"} required/>
            <textarea className={styles.field} placeholder={"Description"}/>
            <input className={`${styles.form_btn} btn`} type={"submit"}/>
        </form>
    );
}
*/


export const Form = ({ title, button, children }: Props) => {
    return (
        <form className={styles.form}>
            <h4>{title}</h4>
            <div className={styles.form_fields}>
                {children}
            </div>
            <button className={`${styles.form_btn} btn`}>{button}</button>
        </form>
    );
};

