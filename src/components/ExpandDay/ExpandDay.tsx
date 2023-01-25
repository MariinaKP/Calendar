import styles from "./ExpandDay.module.scss";
export const ExpandDay = (props: {date: number, day: string}) => {
    return (
        <>
            <div className={styles.expand_day}>
                <div className={styles.date}>
                    <h2>{props.date}</h2>
                    <h3>{props.day}</h3>
                </div>
                <div className={styles.info}>
                    <div>10:03AM</div>
                    <div>Sofia 10C</div>
                </div>
                <div className={styles.assignments}>

                </div>
                <div>ICONKA</div>
            </div>
        </>
    );
}