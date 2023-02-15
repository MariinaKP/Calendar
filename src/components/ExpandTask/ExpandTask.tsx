import styles from "./ExpandTask.module.scss";
import {Modal} from "../Modal/Modal";
import {icons} from "../../assets/icons";
import React, {useContext, useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase-config";
import {AuthContext} from "../../AuthContext";

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
  const [expandTaskIsOpened, setExpandTaskIsOpened] = useState(false);
  const [taskIsDone, setTaskIsDone] = useState(false);
  const [taskTickClassname, setTaskTickClassname] = useState(`${styles.tick}`);
  const {currentUser} = useContext(AuthContext);

  const handleTaskMarkAsDone = async (task: string) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks/${task}`);
    onAddedTask();
    if (taskIsDone) {
      await updateDoc(taskRef, {isDone: false});
      setTaskIsDone(false);
      setTaskTickClassname(`${styles.tick}`);
    } else {
      await updateDoc(taskRef, {isDone: true});
      setTaskIsDone(true);
      setTaskTickClassname(`${styles.tick_done}`);
    }
  }

  return (
    <>
      <ul>
        <li key={task.id} onClick={() => setExpandTaskIsOpened(true)}>
          {task.title}
        </li>
      </ul>
      {expandTaskIsOpened && (
        <Modal onClose={() => setExpandTaskIsOpened(false)}>
          <div className={styles.expand_task}>
            <div className={styles.expand_task_top}>
              <h3>{task.title}</h3>
              <icons.TiTick
                onClick={() => {
                  handleTaskMarkAsDone(task.id);
                }}
                className={taskTickClassname}/>
            </div>
            <p>{task.description}</p>
          </div>
        </Modal>
      )}
    </>);
};
