import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    format,
    startOfWeek,
    addDays,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subWeeks,
    addWeeks
} from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../components/Weekly.css";
import Clock from "./Clock";
import Dropdown from "./Dropdown";

function Weekly(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeDate, setActiveDate] = useState(new Date());

    // lists for dropdowns
    var create_lst = [
        { value: "Create", label: "Create" },
        { value: "Event", label: "Event" },
        { value: "Class", label: "Class" },
        { value: "Calendar", label: "Calendar" },
        { value: "To Do Item", label: "To Do Item" }
    ];

    var cal_lst = [{ value: "Default", label: "Calendars" }];

    var todo_lst = [{ value: "Default", label: "To Do" }];

    // gets header of calendar (same as monthly)
    const getHeader = () => {
        return (
            <div className="header">
                <div
                    className="todayButton"
                    onClick={() => {
                        setSelectedDate(new Date());
                        setActiveDate(new Date());
                    }}
                >
                    Today
                </div>
                <AiOutlineLeft
                    className="navIcon"
                    onClick={() => setActiveDate(subWeeks(activeDate, 1))}
                />
                <AiOutlineRight
                    className="navIcon"
                    onClick={() => setActiveDate(addWeeks(activeDate, 1))}
                />
                <div className="currentMonth">
                    {format(activeDate, "MMMM yyyy")}
                </div>
            </div>
        );
    };

    // generates the dates based on the current date (same as monthly)
    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        let currentDate = date;
        const week = [];
        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            week.push(
                <div className="weekly-day-box">
                    <div
                        className={`selected-day-frame ${
                            isSameMonth(currentDate, activeDate)
                                ? ""
                                : "inactiveDay"
                        } ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
              ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
                    >
                        {format(currentDate, "d")}
                    </div>
                </div>
            );
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
    };

    // same as monthly, but only takes in start of week and end of week parameters instead of start and end of month
    const getDates = () => {
        const startDate = startOfWeek(activeDate);
        const endDate = endOfWeek(activeDate);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {
            allWeeks.push(
                generateDatesForCurrentWeek(
                    currentDate,
                    selectedDate,
                    activeDate
                )
            );
            currentDate = addDays(currentDate, 7);
        }

        return <div className="calendar-container">{allWeeks}</div>;
    };

    // same as generateDates and monthly -> generates events in the days from the current week
    const generateEventsForCurrentWeek = (date) => {
        let currentDate = date;
        var week = [];

        var events = props.events;
        var d;
        var events = props.events;

        for (let day = 0; day < 7; day++) {
            const cloneDate = format(currentDate, "MM/dd/yyyy");
            var t = [];
            for (var i = 0; i < events.length; i++) {
                d = new Date(events[i].start);
                var timeZoneFromDB = 7.0;
                var tzDifference = timeZoneFromDB * 60 + d.getTimezoneOffset();
                var offsetTime = new Date(
                    d.getTime() + tzDifference * 60 * 1000
                );
                var df = format(offsetTime, "MM/dd/yyyy");
                if (cloneDate === df) {
                    t.push(events[i].title);
                }
            }
            console.log(t);
            week.push(<div className="box">{makeEvents(t)}</div>);
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
    };

    // function to make div classes for events
    function makeEvents(lst) {
        var l2 = [];
        for (var i = 0; i < lst.length; i++) {
            if (l2[i] != "") {
                l2.push(<div className="event-box">{lst[i]}</div>);
            }
        }
        return l2;
    }

    // generates events for the week (same as getWeeks)
    const getEvents = () => {
        const startDate = startOfWeek(activeDate);
        const endDate = endOfWeek(activeDate);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {
            allWeeks.push(generateEventsForCurrentWeek(currentDate));
            currentDate = addDays(currentDate, 7);
        }

        return <div className="events">{allWeeks}</div>;
    };

    const navigate = useNavigate();

    function handleSettings() {
        // go to settings page
        navigate("/settings");
    }
    function handleMonthly() {
        // go to weekly page
        navigate("/monthly");
    }
    function handleToDo() {
        // go to todo page
        navigate("/todo");
    }

    // from useEffect -> fetch requests for calendar, item, and event lists for user
    var names = props.calendars;
    for (var i = 0; i < names.length; i++) {
        cal_lst.push({ value: names[i].name, label: names[i].name });
    }

    var todos = props.items;
    for (var i = 0; i < todos.length; i++) {
        todo_lst.push({ value: todos[i].contents, label: todos[i].contents });
    }

    var events = props.events;
    for (var i = 0; i < events.length; i++) {
        console.log(events[i].title);
    }
    return (
        <>
            <button className="logout" onClick={props.logout}>
                {" "}
                Log Out{" "}
            </button>
            <div className="calendar-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="calendar-todo-dropdown">
                        {Dropdown(props, cal_lst)}
                    </div>
                </div>
            </div>
            <div className="todo-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="calendar-todo-dropdown">
                        {Dropdown(props, todo_lst)}
                    </div>
                </div>
            </div>
            {getHeader()}
            <div className="the-clock">
                <Clock />
            </div>
            <div className="create-dropdown">{Dropdown(props, create_lst)}</div>
            <button className="change-view-frame" onClick={handleMonthly}>
                <span className="change-view">Monthly View</span>
            </button>
            <button className="todo-view-frame" onClick={handleToDo}>
                <span className="change-view">To Do</span>
            </button>
            <button className="settings-frame" onClick={handleSettings}>
                {/* <div className='weekly-gear' /> */}
                <span className="gear"></span>
            </button>
            <button className="download-frame">
                <span className="download-icon"></span>
            </button>

            <div className="weekly-time-container">
                {/* Time slots */}
                <span className="weekly-time-slot">8am</span>
                <span className="weekly-time-slot">9am</span>
                <span className="weekly-time-slot">10am</span>
                <span className="weekly-time-slot">11am</span>
                <span className="weekly-time-slot">12pm</span>
                <span className="weekly-time-slot">1pm</span>
                <span className="weekly-time-slot">2pm</span>
                <span className="weekly-time-slot">3pm</span>
                <span className="weekly-time-slot">4pm</span>
                <span className="weekly-time-slot">5pm</span>
                <span className="weekly-time-slot">6pm</span>
                <span className="weekly-time-slot">7pm</span>
                <span className="weekly-time-slot">8pm</span>
            </div>
            {/* <div className='weekly-expand' /> */}
            <div className="days-frame">
                <span className="days-header">SUN</span>
                <span className="days-header">MON</span>
                <span className="days-header">TUE</span>
                <span className="days-header">WED</span>
                <span className="days-header">THU</span>
                <span className="days-header">FRI</span>
                <span className="days-header">SAT</span>
            </div>
            {getDates()}
            {getEvents()}
        </>
    );
}
export default Weekly;
