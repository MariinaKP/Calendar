import {useState} from "react";
import {ExpandDay} from "../ExpandDay/ExpandDay";
import holidays from 'date-holidays';
import {icons} from "../../assets/icons";
import styles from "./Calendar.module.scss";

export const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState({date: date.getDate(), day: date.getDay()});
    let selectedYear = date.getFullYear();
    let selectedMonth = date.getMonth();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    type DaysType = {
        day: number;
        month: number;
        holidays?: string[];
        tasks?: [{title: string; description: string}]
    };

    const days: DaysType[] = [];

    let lastDay: number;
    let lastDayIndex: number;
    let firstDayIndex: number;
    let prevLastDay: number;
    let prevLastDayIndex: number;

    function renderCalendar() {
        lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        lastDayIndex = new Date(selectedYear, selectedMonth + 1, 0).getDay();
        firstDayIndex = new Date(selectedYear, selectedMonth + 1, 1).getDay();
        prevLastDay = new Date(selectedYear, selectedMonth, 0).getDate();
        prevLastDayIndex = new Date(selectedYear, selectedMonth, 0).getDay();

        addPrevMonthDays(prevLastDay);
        addSelectedMonthDays(lastDay);
        addNextMonthDays();
    }
    renderCalendar();

    function addPrevMonthDays(prevLastDay:number) {
        let firstDayOfWeek = prevLastDayIndex;
        prevLastDay -= prevLastDayIndex;

        for (let i = 0; i <= firstDayOfWeek; i++) {
            const day = {day: prevLastDay++, month: selectedMonth === 0 ? 11 : selectedMonth - 1 }
            days.push(day);
        }
    }
    function addSelectedMonthDays(lastDay:number) {
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
    const bgHolidays = new holidays('BG');
    const allHolidays  = bgHolidays.getHolidays();

    // type HolidaysType = [
    //         { month: number; holidays: [
    //                 { day: number; name: string; }
    //             ]; }
    //     ];
    //
    // const monthsWithHolidays = {
    // };
    //

    allHolidays.forEach((x) => {
        const currMonth = x.start.getMonth();
        const currDay = x.start.getDate();
        const name = x.name;

        days.forEach((y) => {
           if (y.day === currDay && y.month === currMonth ) {
               y.holidays = [name];
               console.log(y);
               console.log(currDay);
               console.log(currMonth);
           }

        });
    });

    console.log(allHolidays);

    console.log(days);
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
                        {/*{days.map((day) =>*/}
                        {/*    <li>{day.day}</li>*/}
                        {/*)}*/}
                        {
                            days.map((day, index) => {
                                let prevMonth = false;
                                let nextMonth = false;
                                if (day.month !== selectedMonth ) {
                                    if (day.month === selectedMonth + 1) nextMonth = true;
                                    prevMonth = true;
                                }
                                // let prevMonth = index <= prevLastDayIndex; // sets boolean which checks if the day from the days[] is from the prev month
                                // let nextMonth = index > prevLastDayIndex + lastDay; // sets boolean which checks if the day from the days[] is from the next month
                                let inactiveClass = prevMonth || nextMonth ? `${styles.inactive}` : ''; // sets classname to the days that are not from the selected month
                                let selectedDayClass = (!prevMonth && !nextMonth) && day.day === selectedDay.date ? `${styles.selected_day}` : ''; // sets classname to the day that has been selected
                                let currentDayClass = (!prevMonth && !nextMonth) && ((day.day === new Date().getDate()) && (new Date().getMonth() === selectedMonth)) ? `${styles.current_day}` : ''; // sets classname to the today's day

                                return (
                                    <li
                                        className={`${inactiveClass} ${selectedDayClass}`}
                                        onClick={() => {
                                            let selectedDayIndex = new Date(selectedYear, selectedMonth, day.day).getDay(); // is used to define the day of the week

                                            // if day from the next month is clicked, the selected month is updated to be that month
                                            if (prevMonth) {
                                                setDate(new Date(selectedYear, selectedMonth - 1, day.day));
                                                selectedDayIndex = new Date(selectedYear, selectedMonth - 1, day.day).getDay();
                                            }

                                            // if day from the prev month is clicked, the selected month is updated to be that month
                                            if (nextMonth) {
                                                setDate(new Date(selectedYear, selectedMonth + 1, day.day));
                                                selectedDayIndex = new Date(selectedYear, selectedMonth + 1, day.day).getDay();
                                            }
                                            setSelectedDay({date: day.day, day: selectedDayIndex})
                                        }}
                                    >
                                        <span
                                            className={`${currentDayClass}`}
                                        >
                                            {day.day}
                                        </span>
                                        <p className={styles.task}></p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <ExpandDay date={selectedDay.date} day={daysOfWeek[selectedDay.day]}/>
            <icons.TfiAngleRight className={styles.arrow}
                                 onClick={() => setDate(new Date(selectedYear, selectedMonth + 2, 0))}/>
        </>
    );
};