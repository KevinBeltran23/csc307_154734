// src/pages/Monthly.jsx

// code tutorial from https://medium.com/@jain.jenil007/building-a-calendar-in-react-2c53b6ca3e96

// npm install date-fn react-icons

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../components/Monthly.css";
import Clock from "./Clock";
import Dropdown from "./Dropdown";


function Monthly(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  // misc variables

  var create_lst = [
    { value: "Create", label: "Create" },
    { value: "Event", label: "Event" },
    { value: "Class", label: "Class" },
    { value: "Calendar", label: "Calendar" },
    { value: "To Do Item", label: "To Do Item" }
  ];

  var cal_lst = [
    { value: "Create", label: "Calendars" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" }
  ];

  var todo_lst = [
    { value: "Create", label: "To Do" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" }
  ];


  const getHeader = () => {
    return (
      <div className="header">
        <div
          className="todayButton"
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}
        >Today</div>
        <AiOutlineLeft
          className="navIcon"
          onClick={() => setActiveDate(subMonths(activeDate, 1))}
        />
        <AiOutlineRight
          className="navIcon"
          onClick={() => setActiveDate(addMonths(activeDate, 1))}
        />
        <div className="currentMonth">{format(activeDate, "MMMM yyyy")}</div>
      </div>
    );
  };

  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div className='monthly-day-box'>
          <div
            className={`selected-day-frame ${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"
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

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
      );
      currentDate = addDays(currentDate, 7);
    }

    return (
      <div className="calendar-container">
        {allWeeks}
      </div>
    );
  };
  const addEvents = () => {
    var testDate;
    var desc;
    var startTime;
    var endTime;

  }
  /*const getEvents = () => {

  } */

  const navigate = useNavigate();

  function handleSettings() {
    // go to settings page
    navigate('/settings');
  }
  function handleWeekly() {
    // go to weekly page
    navigate('/weekly');
  }
  function handleToDo() {
    // go to todo page
    navigate('/todo');
  }
  function handleCreate() {
    // create an event
    // there will be a POST request here to /event
  }
  function handleCalendarsDropdown() {
    // open calendars drop down
    // there will be a GET request here to /calendars
  }
  function handleToDoDropdown() {
    // open todo dropdown
    // there will be a GET request here to /todo
  }
  function handleClickingOnEvent() {
    // implement functionality
    // there will be a GET request here to /event/:id
  }

  return (
    <><button className="logout" onClick={props.logout}> Log Out </button>

      <div className='calendar-dropdown-container'>
        <div className='dropdown-rectangle'>
          <div className="dropdown-button-frame">
            <div className="calendar-todo-dropdown">
              {Dropdown(props, cal_lst)}
            </div>
          </div>
        </div>
      </div>
      <div className='todo-dropdown-container'>
        <div className='dropdown-rectangle'>
          <div className="dropdown-button-frame">
            <div className="calendar-todo-dropdown">
              {Dropdown(props, todo_lst)}
            </div>
          </div>
        </div>
      </div>
      {getHeader()}
      <div className='the-clock'>
        <Clock />
      </div>
      <div className="create-dropdown">{Dropdown(props, create_lst)}</div>
      <button className='change-view-frame' onClick={handleWeekly}>
        <span className='change-view'>Weekly View</span>
      </button>
      <button className='todo-view-frame' onClick={handleToDo}>
        <span className='change-view'>To Do</span>
      </button>
      <button className='settings-frame' onClick={handleSettings}>
        {/* <div className='weekly-gear' /> */}
        <span className='gear'></span>
      </button>
      <button className='download-frame'>
        <span className='download-icon' ></span>
      </button>

      <div className='days-frame'>
        <span className='days-header'>SUN</span>
        <span className='days-header'>MON</span>
        <span className='days-header'>TUE</span>
        <span className='days-header'>WED</span>
        <span className='days-header'>THU</span>
        <span className='days-header'>FRI</span>
        <span className='days-header'>SAT</span>
      </div>
      {getDates()}
    </>
  );
};


export default Monthly;
