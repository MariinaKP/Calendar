import {icons} from "../../assets/icons";
import {Modal} from "../Modal/Modal";
import React, {useState} from "react";
import {Form} from "../Form/Form";
import styles from "./ExpandDay.module.scss";
import stylesForm from "../Form/Form.module.scss";


type Props = {
    date: number;
    day: string;
    holiday?: string;
}
export const ExpandDay = ({ date, day, holiday}:Props) => {
    // if (props.holiday !== undefined) {
    //     <p>props.name</p>
    // }
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <div className={styles.expand_day}>
                <div className={styles.date}>
                    <h2>{date}</h2>
                    <h3>{day}</h3>
                </div>
                <p>{holiday}</p>
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
                    <Form title={'Add Task'} button={'Submit'}>
                        <input className={stylesForm.field} type={"text"} placeholder={"Title"} required/>
                        <textarea className={stylesForm.field} placeholder={"Description"}/>
                    </Form>
                </Modal>
            )}
        </>
    );
}