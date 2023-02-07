import {useState} from "react";
import {ExpandDay} from "../ExpandDay/ExpandDay";
import holidays from 'date-holidays';
import {icons} from "../../assets/icons";
import styles from "./Calendar.module.scss";

export const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState({date: date.getDate(), day: date.getDay()});
    const [holiday, setHoliday] = useState('');
    let selectedYear = date.getFullYear();
    let selectedMonth = date.getMonth();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    type DaysType = {
        day: number;
        month: number;
        holiday?: string;
        tasks?: [{ title: string; description: string }]
    };

    const days: DaysType[] = [];

    let lastDay: number;
    let lastDayIndex: number;
    let firstDayIndex: number;
    let prevLastDay: number;
    let prevLastDayIndex: number;

    const bgHolidays = new holidays('BG');
    const allHolidays = bgHolidays.getHolidays();

    function renderCalendar() {
        lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        lastDayIndex = new Date(selectedYear, selectedMonth + 1, 0).getDay();
        firstDayIndex = new Date(selectedYear, selectedMonth + 1, 1).getDay();
        prevLastDay = new Date(selectedYear, selectedMonth, 0).getDate();
        prevLastDayIndex = new Date(selectedYear, selectedMonth, 0).getDay();

        addPrevMonthDays(prevLastDay);
        addSelectedMonthDays(lastDay);
        addNextMonthDays();
        addHolidays();
    }

    renderCalendar();

    function addPrevMonthDays(prevLastDay: number) {
        let firstDayOfWeek = prevLastDayIndex;
        prevLastDay -= prevLastDayIndex;

        for (let i = 0; i <= firstDayOfWeek; i++) {
            const day = {day: prevLastDay++, month: selectedMonth === 0 ? 11 : selectedMonth - 1}
            days.push(day);
        }
    }

    function addSelectedMonthDays(lastDay: number) {
        for (let i = 1; i <= lastDay; i++) {
            const day = {day: i, month: selectedMonth}
            days.push(day);
        }
    }

    function addNextMonthDays() {
        let daysLength = days.length;

        for (let i = 1; i <= 42 - daysLength; i++) {
            const day = {day: i, month: selectedMonth + 1}
            days.push(day);
        }
    }

    function addHolidays() {
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
    }

    function setSelectedDayAndDate(prevMonth: boolean, nextMonth: boolean, day: number) {
        let selectedDayIndex = new Date(selectedYear, selectedMonth, day).getDay();

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
    }

    function setClassToInactiveDay(prevMonth: boolean, nextMonth: boolean) {
        if (prevMonth || nextMonth) return `${styles.inactive}`;
    }

    function setClassToSelectedDay(prevMonth: boolean, nextMonth: boolean, day: number) {
        if (!prevMonth && !nextMonth && day === selectedDay.date) return `${styles.selected_day}`;
    }

    function setClassToCurrentDay(prevMonth: boolean, nextMonth: boolean, day: number) {
        if ((!prevMonth && !nextMonth) && ((day === new Date().getDate()) && (new Date().getMonth() === selectedMonth)))
            return `${styles.current_day}`;
    }

    function setDaysWithHolidays(holiday?: string) {
        if (holiday !== undefined) {
            return <icons.AiFillStar className={styles.star}/>;
        }
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

                                return (
                                    <li
                                        className={`${setClassToInactiveDay(prevMonth, nextMonth)} ${setClassToSelectedDay(prevMonth, nextMonth, day.day)}`}
                                        onClick={() => setSelectedDayAndDate(prevMonth, nextMonth, day.day)}
                                    >
                                        <span
                                            className={`${setClassToCurrentDay(prevMonth, nextMonth, day.day)}`}
                                        >
                                            {setDaysWithHolidays(day.holiday)}
                                            {day.day}
                                        </span>
                                        {/*<p className={styles.task}></p>*/}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
            <ExpandDay date={selectedDay.date} day={daysOfWeek[selectedDay.day]} />
            <icons.TfiAngleRight className={styles.arrow}
                                 onClick={() => setDate(new Date(selectedYear, selectedMonth + 2, 0))}/>
        </>
    );
};