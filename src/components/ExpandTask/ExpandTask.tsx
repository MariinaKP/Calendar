import styles from "./ExpandTask.module.scss";
import {Modal} from "../Modal/Modal";
import {icons} from "../../assets/icons";
import React, {useContext, useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase-config";
import {AuthContext} from "../../context/AuthContext";

type Task = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

type Props = {
  onAddedTask: () => void;
  task: Task;
}
export const ExpandTask = ({ task, onAddedTask }: Props) => {
  const [IsOpened, setIsOpened] = useState(false);
  const [taskIsDone, setTaskIsDone] = useState(task.isDone);
  const {currentUser} = useContext(AuthContext);

  const markTaskAsDone = async (task: string) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks/${task}`);

    if (taskIsDone) {
      await updateDoc(taskRef, {isDone: false});
      setTaskIsDone(false);
    } else {
      await updateDoc(taskRef, {isDone: true});
      setTaskIsDone(true);
    }
    onAddedTask();
  }

  return (
    <>
        <li
          className={taskIsDone ? `${styles.task_done}` : ''}
          key={task.id}
          onClick={() => setIsOpened(true)}
        >
          {task.title}
        </li>
      {IsOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <div className={styles.expand_task}>
            <div className={styles.expand_task_top}>
              <h3>{task.title}</h3>
              <icons.TiTick
                onClick={() => {
                  markTaskAsDone(task.id);
                }}
                className={taskIsDone ? `${styles.tick_done}` : `${styles.tick}`}/>
            </div>
            <p>{task.description}</p>
          </div>
        </Modal>
      )}
    </>);
};
