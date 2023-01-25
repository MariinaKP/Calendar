import {useState} from "react";
import {ExpandDay} from "../ExpandDay/ExpandDay";
import {icons} from "../../assets/icons";
import styles from "./Calendar.module.scss";

export const Calendar = () => {
    const [date, setDate] = useState(new Date());
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days: number[] = [];

    let lastDay: number;
    let prevLastDay: number;
    let prevLastDayIndex: number;

    function renderCalendar() {
        lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
        prevLastDayIndex = new Date(currentYear, currentMonth, 0).getDay();

        let firstDayOfWeek = prevLastDayIndex;
        prevLastDay -= prevLastDayIndex;

        for (let i = 0; i <= firstDayOfWeek; i++) {
            days.push(prevLastDay++);
        }

        for (let i = 1; i <= lastDay; i++) {
            days.push(i);
        }

        let daysLength = days.length;
        for (let i = 1; i <= 42 - daysLength; i++) {
            days.push(i);
        }
    }

    renderCalendar();
    return (
        <>
            <icons.TfiAngleLeft className={styles.arrow} onClick={() => setDate(new Date(currentYear, currentMonth, 0))} />
            <div className={styles.calendar_wrapper}>
                <div className={styles.month_title}>
                    <h3>{`${months[currentMonth]} ${currentYear}`}</h3>
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
                            days.map((day, index) => {
                                return (
                                    // TODO classname
                                    <li className={index <= prevLastDayIndex || index > prevLastDayIndex + lastDay ? 'inactive' : ''}>{day}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
            <ExpandDay/>
            {/*TODO icon css*/}
            <icons.TfiAngleRight className={styles.arrow} onClick={() => setDate(new Date(currentYear, currentMonth + 2, 0))}/>
        </>
    );
};