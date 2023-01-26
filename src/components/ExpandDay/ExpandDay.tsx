import styles from "./ExpandDay.module.scss";
import {icons} from "../../assets/icons";
import {Modal} from "../Modal/Modal";
import React, {useState} from "react";
import {Form} from "../Form/Form";

export const ExpandDay = (props: { date: number, day: string }) => {
    const [isOpened, setIsOpened] = useState(false);

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
                <div className={styles.tasks}>
                    <div className={styles.tasks_add}>
                        No tasks
                        <div className={styles.tasks_icon} onClick={() => setIsOpened(true)}>
                            <icons.BiPencil/>
                        </div>
                    </div>
                    <ul></ul>
                </div>
            </div>
            {isOpened && (
                <Modal onClose={() => setIsOpened(false)}>
                    <Form/>
                </Modal>
            )}
        </>
    );
}