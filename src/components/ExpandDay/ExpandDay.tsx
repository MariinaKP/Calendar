import {icons} from "../../assets/icons";
import {Modal} from "../Modal/Modal";
import React, {useContext, useState} from "react";
import {Form} from "../Form/Form";
import styles from "./ExpandDay.module.scss";
import stylesForm from "../Form/Form.module.scss";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase-config";
import {AuthContext} from "../../AuthContext";
import {collection} from "firebase/firestore";
import {SuccessMessage} from "../SuccessMessage/SuccessMessage";

type Task = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

type Props = {
  date: Date;
  // day: string;
  holiday?: string;
  tasks?: Task[];
  onSubmit: (tasks: Task[]) => void;
}
export const ExpandDay = ({date, holiday, tasks, onSubmit}: Props) => {
  const [addTaskIsOpened, setAddTaskIsOpened] = useState(false);
  const [expandTaskIsOpened, setExpandTaskIsOpened] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskIsDone, setTaskIsDone] = useState(false);
  const {currentUser} = useContext(AuthContext);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addTask = async (e: any): Promise<void> => {
    e.preventDefault();


    // try {
    const userDocRef = doc(db, "users", currentUser.uid);
    await setDoc(userDocRef, {
      email: currentUser.email
    });

    const taskDocRef = doc(collection(db, `users/${currentUser.uid}/tasks`));
    await setDoc(
      taskDocRef,
      {
        title: taskTitle,
        description: taskDesc,
        isDone: false,
        taskDate: date,
        id: taskDocRef.id
      }
    )

    setAddTaskIsOpened(false);
    welcomeMessage();
    // } catch (err) {
    //     console.log(err);
    // }

    onSubmit(tasks || []);
  }

  const updateTaskAsDone = async (task: string) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks/${task}`);
    await updateDoc(taskRef, {isDone: true});
  }
  const welcomeMessage = () => {
    setIsSuccessMessageVisible(true);
    setTimeout(() => {
      setIsSuccessMessageVisible(false);
    }, 2000);
  }


  return (
    <>
      <div className={styles.expand_day}>
        <div className={styles.date}>
          <h2>{date.getDate()}</h2>
          <h3>{daysOfWeek[date.getDay()]}</h3>
          <p>{holiday}</p>
        </div>
        <div className={styles.tasks}>
          <div className={styles.tasks_add}>
            Add Task
            <div className={styles.tasks_icon} onClick={() => setAddTaskIsOpened(true)}>
              <icons.BiPencil/>
            </div>
          </div>
          {tasks?.map(task => {
            return (
              <>
                <ul>
                  <li onClick={() => setExpandTaskIsOpened(true)}>
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
                            updateTaskAsDone(task.id)
                            setTaskIsDone(true);
                          }}
                          className={!taskIsDone ? `${styles.tick}` : `${styles.tick_done}`}/>
                      </div>
                      <p>{task.description}</p>
                    </div>
                  </Modal>
                )}
              </>
            )
          })}
        </div>
      </div>
      {addTaskIsOpened && (
        <Modal onClose={() => setAddTaskIsOpened(false)}>
          <Form title={'Add Task'} button={'Submit'} onClick={addTask}>
            <input
              className={stylesForm.field}
              type={"text"}
              placeholder={"Title"}
              required
              onChange={(e) => setTaskTitle(e.target.value)}/>
            <textarea
              className={stylesForm.field}
              placeholder={"Description"}
              onChange={(e) => setTaskDesc(e.target.value)}/>
          </Form>
        </Modal>
      )}
      {isSuccessMessageVisible && <SuccessMessage>Added Task Successfully</SuccessMessage>}
    </>
  );
}