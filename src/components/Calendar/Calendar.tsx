import {useContext, useEffect, useState} from "react";
import {ExpandDay} from "../ExpandDay/ExpandDay";
import {collection, getDocs} from "firebase/firestore";
import {icons} from "../../assets/icons";
import styles from "./Calendar.module.scss";
import holidays from 'date-holidays';
import {db} from "../../firebase-config";
import {AuthContext} from "../../AuthContext";
import {SuccessMessage} from "../SuccessMessage/SuccessMessage";

export const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(date);
    const [currDayHoliday, setCurrDayHoliday] = useState('');
    const [currDayTasks, setCurrDayTasks] = useState<Task[]>([]);
    let selectedYear = date.getFullYear();
    let selectedMonth = date.getMonth();
    const {currentUser} = useContext(AuthContext);
    const [addedTask, setAddedTask] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    type Task = {
      id: string;
      title: string;
      description: string;
      isDone: boolean;
    }

    type DaysType = {
      day: number;
      month: number;
      holiday?: string;
      tasks?: Task[];
    };

    const [days, setDays] = useState<DaysType[]>([]);

    let lastDay: number;
    let prevLastDay: number;
    let prevLastDayIndex: number;

    const bgHolidays = new holidays('BG');
    const allHolidays = bgHolidays.getHolidays();

    async function renderCalendar() {
      lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      prevLastDay = new Date(selectedYear, selectedMonth, 0).getDate();
      prevLastDayIndex = new Date(selectedYear, selectedMonth, 0).getDay();

      let days = addPrevMonthDays(prevLastDay);
      days = [...days, ...addSelectedMonthDays(lastDay)];
      days = [...days, ...addNextMonthDays(days.length)];
      days = fetchingHolidays(days);
      const daysWithTasks = await fetchingTasks(days);
      setDays(daysWithTasks || days);
    }

    useEffect(() => {
      renderCalendar();
    }, [date, currentUser, addedTask]);



    function addPrevMonthDays(prevLastDay: number) {
      let firstDayOfWeek = prevLastDayIndex;
      prevLastDay -= prevLastDayIndex;

      const days = [];
      for (let i = 0; i <= firstDayOfWeek; i++) {
        const day = {day: prevLastDay++, month: selectedMonth === 0 ? 11 : selectedMonth - 1};
        days.push(day);
      }
      return days;
    }

    function addSelectedMonthDays(lastDay: number) {
      const days = [];

      for (let i = 1; i <= lastDay; i++) {
        const day = {day: i, month: selectedMonth}
        days.push(day);
      }
      return days;
    }

    function addNextMonthDays(daysLength: number) {
      const days = [];

      for (let i = 1; i <= 42 - daysLength; i++) {
        const day = {day: i, month: selectedMonth + 1}
        days.push(day);
      }
      return days;
    }

    const fetchingHolidays = (days: DaysType[]) => {
      allHolidays.forEach((x) => {
        const currMonth = x.start.getMonth();
        const currDay = x.start.getDate();
        const name = x.name;

        days.forEach((y) => {
          if (y.day === currDay && y.month === currMonth) {
            y.holiday = name;
          }
        });
      });
      return days;
    }

    const fetchingTasks = async (days: DaysType[]) => {
      if (!currentUser) {
        return days;
      }
      const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/tasks`));
      querySnapshot.forEach((doc) => {
        const taskDate = doc.data().taskDate.toDate().getDate();
        const taskMonth = doc.data().taskDate.toDate().getMonth();
        const id = doc.data().id;
        const title = doc.data().title;
        const description = doc.data().description;
        const isDone = doc.data().isDone;
        days.forEach((x) => {
          if (x.day === taskDate && x.month === taskMonth) {
            x.tasks = x.tasks || [];
            x.tasks.push({id: id, title: title, description: description, isDone: isDone});
          }
        });
      });
      return days;
    }

    const setSelectedDay = (prevMonth: boolean, nextMonth: boolean, day: number, holiday?: string, tasks?: Task[]) => {
      // if day from the next month is clicked, the selected month is updated to be that month
      if (prevMonth) {
        setDate(new Date(selectedYear, selectedMonth - 1, day));
      }

      // if day from the prev month is clicked, the selected month is updated to be that month
      if (nextMonth) {
        setDate(new Date(selectedYear, selectedMonth + 1, day));
      }

      setSelectedDate(new Date(selectedYear, selectedMonth, day))

      if (holiday !== undefined) setCurrDayHoliday(holiday)
      else setCurrDayHoliday('');

      if (tasks !== undefined) setCurrDayTasks(tasks)
      else setCurrDayTasks([]);
    }

    const setClassToInactiveDay = (prevMonth: boolean, nextMonth: boolean) => {
      if (prevMonth || nextMonth) return `${styles.inactive}`;
    }

    const setClassToSelectedDay = (prevMonth: boolean, nextMonth: boolean, day: number) => {
      if (!prevMonth && !nextMonth && day === selectedDate.getDate()) return `${styles.selected_day}`;
    }

    const setClassToCurrentDay = (prevMonth: boolean, nextMonth: boolean, day: number) => {
      if ((!prevMonth && !nextMonth) && ((day === new Date().getDate()) && (new Date().getMonth() === selectedMonth)) && (date.getFullYear() === 2023))
        return `${styles.current_day}`;
    }

    const setDaysWithHolidays = (holiday?: string) => {
      if (holiday !== undefined) {
        return <icons.AiFillStar className={styles.star}/>;
      }
    }

    const onAddedTask = () => {
      setAddedTask(!addedTask);
    }

    return (
      <>
        <icons.TfiAngleLeft className={styles.arrow}
                            onClick={() => setDate(new Date(selectedYear, selectedMonth, 0))}
        />
        <div className={styles.calendar_wrapper}>
          <div className={styles.month_title}>
            <h3><span>{months[selectedMonth]}</span>{selectedYear}</h3>
          </div>
          <div className={styles.calendar}>
            <ul className={styles.weeks}>
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className={styles.days}>
              {
                days.map((day) => {
                  let prevMonth = false;
                  let nextMonth = false;
                  if (day.month !== selectedMonth) {
                    if (day.month === selectedMonth + 1) nextMonth = true;
                    prevMonth = true;
                  }

                  let remaing = day.tasks?.filter((element, index) => index >= 2).length;

                  return (
                    <li
                      className={`${setClassToInactiveDay(prevMonth, nextMonth)} ${setClassToSelectedDay(prevMonth, nextMonth, day.day)}`}
                      onClick={() => setSelectedDay(prevMonth, nextMonth, day.day, day.holiday, day.tasks)}
                      key={day.day.toString()+day.month.toString()}
                    >
                      <span className={`${setClassToCurrentDay(prevMonth, nextMonth, day.day)}`}>
                        {setDaysWithHolidays(day.holiday)}
                        {day.day}
                      </span>
                      {day.tasks?.map((task, index) => {
                        if (index < 2) {
                          if (!task.isDone) {
                            return <p key={task.id} className={styles.task}></p>;
                          } else {
                            return <p key={task.id} className={styles.task_done}></p>;
                          }
                        }
                      })}
                      <p className={styles.task_more}>{remaing !== undefined && remaing !== 0 ? `${remaing} more` : ''}</p>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
        <ExpandDay date={selectedDate} holiday={currDayHoliday} tasks={currDayTasks} onAddedTask={onAddedTask}/>
        <icons.TfiAngleRight className={styles.arrow}
                             onClick={() => setDate(new Date(selectedYear, selectedMonth + 2, 0))}/>
      </>
    );
  }
;