// src/pages/Monthly.jsx

// code tutorial from https://medium.com/@jain.jenil007/building-a-calendar-in-react-2c53b6ca3e96

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* date-fns used for the calendar -- makes date parsing and formatting easier */
import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths
} from "date-fns";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // arrows for calendar
import "../components/Monthly.css";
import Clock from "./Clock";
import Dropdown from "./Dropdown";

function Monthly(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeDate, setActiveDate] = useState(new Date());

    // misc variables

    /* lists for dropdowns */
    var create_lst = [
        { value: "Create", label: "Create" },
        { value: "Event", label: "Event" },
        { value: "Class", label: "Class" },
        { value: "Calendar", label: "Calendar" },
        { value: "To Do Item", label: "To Do Item" }
    ];

    var cal_lst = [{ value: "Default", label: "Calendars" }];

    var todo_lst = [{ value: "Default", label: "To Do" }];

    /* generates a header for the calendar, containing the today button, arrows, and the current month */
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
                    onClick={() => setActiveDate(subMonths(activeDate, 1))}
                />
                <AiOutlineRight
                    className="navIcon"
                    onClick={() => setActiveDate(addMonths(activeDate, 1))}
                />
                <div className="currentMonth">
                    {format(activeDate, "MMMM yyyy")}
                </div>
            </div>
        );
    };

    /* gets today's date, and gets the dates for the current week from that */
    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        let currentDate = date;
        const week = [];

        // loop to get the week
        for (let day = 0; day < 7; day++) {
            // week is a list containing react components which are the days for the week
            week.push(
                <div className="monthly-day-box">
                    <div
                        className={`selected-day-frame ${
                            isSameMonth(currentDate, activeDate)
                                ? ""
                                : "inactiveDay"
                        } ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
              ${isSameDay(currentDate, new Date()) ? "today" : ""}`} // all of this code is to check which day is the current day
                    >
                        {format(currentDate, "d")}
                    </div>
                </div>
            );

            // a counter, increments day by 1
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
    };

    /* takes the returns from the previous function and generates the month */
    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;

        const allWeeks = [];

        // endDate is end of the month, currentDate is the start of the first week in the month
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

    /* copy of the generateDatesForCurrentWeek but for events -> same logic */
    const generateEventsForCurrentWeek = (date) => {
        let currentDate = date;
        var week = [];
        var d; // date placeholder var
        var events = props.events; // from useEffect, gets events from database

        for (let day = 0; day < 7; day++) {
            const cloneDate = format(currentDate, "MM/dd/yyyy"); // uses date-fns to format date into something readable
            var t = []; // events list
            for (var i = 0; i < events.length; i++) {
                d = new Date(events[i].start); // gets start date from database
                var timeZoneFromDB = 7.0; // time offset to local time (MongoDB stores in GMT)
                var tzDifference = timeZoneFromDB * 60 + d.getTimezoneOffset(); // converts to local time
                var offsetTime = new Date(
                    d.getTime() + tzDifference * 60 * 1000 // returns converted time
                );
                var df = format(offsetTime, "MM/dd/yyyy"); // formats converted time
                if (cloneDate === df) {
                    // compares formatted times
                    t.push(events[i].title); // if they match, the title of the event goes on that day
                }
            }
            week.push(<div className="box">{makeEvents(t)}</div>); // pushes the events list to weeks
            // array within array so that multiple events can be on one day
            currentDate = addDays(currentDate, 1); // counter
        }
        return <>{week}</>;
    };

    function makeEvents(lst) {
        // creation of event div classes for styling
        var l2 = [];
        for (var i = 0; i < lst.length; i++) {
            if (l2[i] != "") {
                // checks to make sure event isn't empty, then adds to a new list as a div class
                l2.push(<div className="event-box">{lst[i]}</div>);
            }
        }
        return l2;
    }

    const getEvents = () => {
        // copied code, same as getDates but for events
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

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
    function handleWeekly() {
        // go to weekly page
        navigate("/weekly");
    }
    function handleToDo() {
        // go to todo page
        navigate("/todo");
    }

    /* loops from useEffects to get dropdown items */
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
                    <div className="dropdown-button-frame">
                        <div className="calendar-todo-dropdown">
                            {Dropdown(props, cal_lst)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="dropdown-button-frame">
                        <div className="calendar-todo-dropdown">
                            {Dropdown(props, todo_lst)}
                        </div>
                    </div>
                </div>
            </div>
            {getHeader()}
            <div className="the-clock">
                <Clock />
            </div>
            <div className="create-dropdown">{Dropdown(props, create_lst)}</div>
            <button className="change-view-frame" onClick={handleWeekly}>
                <span className="change-view">Weekly View</span>
            </button>
            <button className="todo-view-frame" onClick={handleToDo}>
                <span className="change-view">To Do</span>
            </button>
            <button className="settings-frame" onClick={handleSettings}>
                <span className="gear"></span>
            </button>
            <button className="download-frame">
                <span className="download-icon"></span>
            </button>

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

export default Monthly;
