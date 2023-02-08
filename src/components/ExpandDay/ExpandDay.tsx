import {icons} from "../../assets/icons";
import {Modal} from "../Modal/Modal";
import React, {useContext, useState} from "react";
import {Form} from "../Form/Form";
import styles from "./ExpandDay.module.scss";
import stylesForm from "../Form/Form.module.scss";
import {doc, setDoc, addDoc} from "firebase/firestore";
import {db} from "../../firebase-config";
import {AuthContext} from "../../AuthContext";
import { collection } from "firebase/firestore";

type Props = {
    date: Date;
    // day: string;
    // holiday?: string;
}
export const ExpandDay = ({ date }: Props ) => {
    const [isOpened, setIsOpened] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskIsDone, setTaskIsDone] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const addTask = async (e: any): Promise<void> => {
        e.preventDefault();

        // TODO diff between setDoc and addDoc
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
            email: currentUser.email
        });

        await addDoc(collection(db, `users/${currentUser.uid}/tasks`), {
            title: taskTitle,
            description: taskDesc,
            isDone: false,
            taskDate: date
        });
    }
    return (
        <>
            <div className={styles.expand_day}>
                <div className={styles.date}>
                    <h2>{date.getDate()}</h2>
                    <h3>{daysOfWeek[date.getDay()]}</h3>
                </div>
                <p>{}</p>
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
                    <Form title={'Add Task'} button={'Submit'} onClick={addTask}>
                        <input className={stylesForm.field} type={"text"} placeholder={"Title"} required onChange={(e) => setTaskTitle(e.target.value)}/>
                        <textarea className={stylesForm.field} placeholder={"Description"} onChange={(e) => setTaskDesc(e.target.value)}/>
                    </Form>
                </Modal>
            )}
        </>
    );
}