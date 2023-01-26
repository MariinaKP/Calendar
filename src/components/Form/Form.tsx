import styles from "./Form.module.scss";

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