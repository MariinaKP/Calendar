import {icons} from "../../assets/icons";
import {Modal} from "../Modal/Modal";
import React, {useContext, useEffect, useState} from "react";
import {Form} from "../Form/Form";
import {ExpandTask} from "../ExpandTask/ExpandTask";
import styles from "./ExpandDay.module.scss";
import stylesForm from "../Form/Form.module.scss";
import {doc, setDoc} from "firebase/firestore";
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
  // tasks?: ExpandTask[];
  onAddedTask: () => void;
  tasks?: Task[];
}

export const ExpandDay = ({date, holiday, tasks, onAddedTask}: Props) => {
  const [IsOpened, setIsOpened] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskIsDone, setTaskIsDone] = useState(false);
  const [addedTask, setAddedTask] = useState<[{}]>([{}]);
  const [error, setError] = useState('');
  const {currentUser} = useContext(AuthContext);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addTask = async (e: any): Promise<void> => {
    e.preventDefault();

    if (validation()) {
      setAddedTask([{title: taskTitle, description: taskDesc, isDone: taskIsDone}])
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
      setIsOpened(false);
      addedTaskMessage();
      onAddedTask();
    } else {
      setError('Title must be longer than 0 and shorter than 20.');
    }
  }

  const validation = () => {
    return taskTitle.length > 0 && taskTitle.length <= 20;
  }

  const addedTaskMessage = () => {
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
            <div className={styles.tasks_icon} onClick={() => setIsOpened(true)}>
              <icons.BiPencil/>
            </div>
          </div>
          <ul>
            {tasks?.map(task => {
              return (<ExpandTask key={task.id} task={task} onAddedTask={onAddedTask}/>)
            })}
          </ul>
        </div>
      </div>
      {IsOpened && (
        <Modal onClose={() => setIsOpened(false)}>
          <Form title={'Add Task'} button={'Submit'} onClick={addTask}>
            <input
              className={stylesForm.field}
              type={"text"}
              placeholder={"Title"}
              required
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }
              }/>
            <p className={'error'}>{error}</p>
            <textarea
              className={stylesForm.field}
              placeholder={"Description"}
              onChange={(e) => setTaskDesc(e.target.value)}/>
          </Form>
        </Modal>
      )}
      {isSuccessMessageVisible && <SuccessMessage>Task Added Successfully</SuccessMessage>}
    </>
  );
}