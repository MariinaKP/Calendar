import styles from "./Form.module.scss";

type Props = {
    title: string;
    button: string;
    children?: React.ReactNode;
};

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

