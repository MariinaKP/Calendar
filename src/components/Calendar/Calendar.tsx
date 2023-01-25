import {useState} from "react";
import {ExpandDay} from "../ExpandDay/ExpandDay";
import {icons} from "../../assets/icons";
import styles from "./Calendar.module.scss";

export const Calendar = () => {
    const [date, setDate] = useState(new Date()); // fetching today's date
    const [selectedDay, setSelectedDay] = useState({date: date.getDate(), day: date.getDay()}); // sets default selectedDay to be today's date
    let selectedYear = date.getFullYear(); // sets the default value of selectedYear to be current year
    let selectedMonth = date.getMonth(); // sets the default value of selectedMonth to be current month

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days: number[] = []; // array storing the days that are rendered

    // is going to be used to fill days[] (array) with the days of the current month
    let lastDay: number;

    // prevLastDayIndex is used to calculate how many days we are going to add to days[] (array),
    // by subtracting from the last day of the prev month (prevLastDay) that amount
    let prevLastDay: number;
    let prevLastDayIndex: number;

    function renderCalendar() {
        lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // sets lastDay to be the last day of the current month
        prevLastDay = new Date(selectedYear, selectedMonth, 0).getDate(); // sets prevLastDay to be the last day of the prev month
        prevLastDayIndex = new Date(selectedYear, selectedMonth, 0).getDay(); // sets the index which is used to define the day of the week
        let firstDayOfWeek = prevLastDayIndex;
        prevLastDay -= prevLastDayIndex;

        // pushing the days from the prev month to the days[]
        for (let i = 0; i <= firstDayOfWeek; i++) {
            days.push(prevLastDay++);
        }

        // pushing the days from the selected month to the days[]
        for (let i = 1; i <= lastDay; i++) {
            days.push(i);
        }

        let daysLength = days.length;
        // pushing the days from the next month to the days[]
        for (let i = 1; i <= 42 - daysLength; i++) {
            days.push(i);
        }
    }

    renderCalendar();
    return (
        <>
            <icons.TfiAngleLeft className={styles.arrow}
                                onClick={() => setDate(new Date(selectedYear, selectedMonth, 0))}
            />
            <div className={styles.calendar_wrapper}>
                <div className={styles.month_title}>
                    <h3>{`${months[selectedMonth]} ${selectedYear}`}</h3>
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
                                let prevMonth = index <= prevLastDayIndex; // sets boolean which checks if the day from the days[] that are from the prev month
                                let nextMonth = index > prevLastDayIndex + lastDay; // sets boolean which checks if the day from the days[] that are from the next month
                                let inactiveClass = prevMonth || nextMonth ? `${styles.inactive}` : ''; // sets classname to the days that are not from the selected month
                                let selectedDayClass = (!prevMonth && !nextMonth) && day === selectedDay.date ? `${styles.selected_day}` : ''; // sets classname to the day that has been selected

                                return (
                                    <li
                                        className={`${inactiveClass}`}
                                        onClick={() => {
                                            let selectedDayIndex = new Date(selectedYear, selectedMonth, day).getDay(); // is used to define the day of the week

                                            // if day from the next month is clicked, the selected month is updated to be that month
                                            if (prevMonth) {
                                                setDate(new Date(selectedYear, selectedMonth - 1, day));
                                                selectedDayIndex = new Date(selectedYear, selectedMonth - 1, day).getDay();
                                            }

                                            // if day from the prev month is clicked, the selected month is updated to be that month
                                            if (nextMonth) {
                                                setDate(new Date(selectedYear, selectedMonth + 1, day));
                                                selectedDayIndex = new Date(selectedYear, selectedMonth + 1, day).getDay();
                                            }
                                            setSelectedDay({date: day, day: selectedDayIndex})
                                        }}
                                    >
                                        <span
                                            className={`${selectedDayClass}`}
                                        >
                                            {day}
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <ExpandDay date={selectedDay.date} day={daysOfWeek[selectedDay.day]}/>
            {/*TODO icons css*/}
            <icons.TfiAngleRight className={styles.arrow}
                                 onClick={() => setDate(new Date(selectedYear, selectedMonth + 2, 0))}/>
        </>
    );
};