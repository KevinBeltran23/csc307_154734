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
import Dropdown from "./Dropdown"


function Monthly(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeDate, setActiveDate] = useState(new Date());
  
    const getHeader = () => {
      return (
        <div className="monthly-header">
          <div
            className="monthly-todayButton"
            onClick={() => {
              setSelectedDate(new Date());
              setActiveDate(new Date());
            }}
          >
            Today
          </div>
          <AiOutlineLeft
            className="monthly-navIcon"
            onClick={() => setActiveDate(subMonths(activeDate, 1))}
          />
          <AiOutlineRight
            className="monthly-navIcon"
            onClick={() => setActiveDate(addMonths(activeDate, 1))}
          />
          <div className="monthly-currentMonth">{format(activeDate, "MMMM yyyy")}</div>
        </div>
      );
    };

    //var lst1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
  
    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
      let currentDate = date;
      const week = [];
      for (let day = 0; day < 7; day++) {
        const cloneDate = currentDate;
        week.push(
          <div className='monthly-day-box'>
            <div
              className={`monthly-day ${
                isSameMonth(currentDate, activeDate) ? "" : "monthly-inactiveDay"
              } ${isSameDay(currentDate, selectedDate) ? "monthly-selectedDay" : ""}
              ${isSameDay(currentDate, new Date()) ? "monthly-today" : ""}`}
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
      const events = []; // need a generateEventsForCurrentWeek!!!!

      while (currentDate <= endDate) {
        allWeeks.push(
          generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
        );
        currentDate = addDays(currentDate, 7);
      }

      /*console.log(format(startOfTheSelectedMonth, 'MM-dd-yyyy hh:mm:ss'))
      console.log(allWeeks) */
  
      return (
        <div>
          <div className="monthly-dayContainer">
            {allWeeks}
          </div>
          <div className="monthly-eventContainer">
            {events}
          </div>
        </div>
        );
    };

    // write helper function to 
    const generateEventsForCurrentWeek = (date, selectedDate, activeDate) => {
      let currentDate = date;
      const week = [];
      const item = ["1", null, "2"];
      for (let day = 0; day < 7; day++) {
        const cloneDate = currentDate;
        week.push(
          <div className='monthly-event'>
            <div className="event">
              {item[day]}
            </div>
          </div>
        );
        currentDate = addDays(currentDate, 1);
      }
      console.log(week.length)
      return <>{week}</>;
    };
  
    const getEvents = () => {
      const startOfTheSelectedMonth = startOfMonth(activeDate);
      const endOfTheSelectedMonth = endOfMonth(activeDate);
      const startDate = startOfWeek(startOfTheSelectedMonth);
      const endDate = endOfWeek(endOfTheSelectedMonth);
  
      let currentDate = startDate;
  
      const allWeeks = [];
      const events = []; // need a generateEventsForCurrentWeek!!!!

      while (currentDate <= endDate) {
        events.push(
          generateEventsForCurrentWeek(currentDate, selectedDate, activeDate)
        );
        currentDate = addDays(currentDate, 7);
      }
  
      return (
        <div>
          <div className="monthly-eventContainer">
            {events}
          </div>
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

    // DROPDOWN CREATE OPTIONS
    var create_lst = [ { value: "Create", label: "Create" },
    { value: "Event", label: "Event" },
    { value: "Calendar", label: "Calendar"}, 
    {value: "To Do Item", label: "To Do Item"}];

    var cal_lst = [ { value: "Create", label: "Calendars" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" }];

    var todo_lst = [ { value: "Create", label: "To Do" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" }];
  
    return (
      <><button className="logout" onClick={props.logout}> Log Out Temporary Button </button>
      <div className="monthly-main-container">
        <div className='monthly-calendar-dropdown-container'>
          <div className='monthly-rectangle'>
            <div className='monthly-calendar-todo-dropdown'>
                {Dropdown(cal_lst)}
            </div>
          </div>
        </div>
        <div className='monthly-todo-dropdown-container'>
          <div className='monthly-rectangle'>
            <div className='monthly-calendar-todo-dropdown'>
                {Dropdown(todo_lst)}
            </div>
          </div>
        </div>
        {getHeader()}
        <div className='monthly-clock'>
          <Clock />
        </div>
        <button className='monthly-weekly-view-frame' onClick={handleWeekly}>
          <span className='monthly-change-view'>Weekly View</span>
        </button>
        <button className='monthly-todo-view-frame' onClick={handleToDo}>
          <span className='monthly-change-view'>To Do</span>
        </button>
        <button className='monthly-settings-frame' onClick={handleSettings}>
          {/* <div className='weekly-gear' /> */}
          <span className='monthly-gear'></span>
        </button>
        <button className='monthly-download-frame'>
          <span className='monthly-download-icon' ></span>
        </button>
        <div className='monthly-create'>
          {Dropdown(create_lst)}
        </div>
        <div className='monthly-days-frame'>
          <span className='monthly-dayHeader'>SUN</span>
          <span className='monthly-dayHeader'>MON</span>
          <span className='monthly-dayHeader'>TUE</span>
          <span className='monthly-dayHeader'>WED</span>
          <span className='monthly-dayHeader'>THU</span>
          <span className='monthly-dayHeader'>FRI</span>
          <span className='monthly-dayHeader'>SAT</span>
        </div>
        {getDates()}
        {getEvents()}
      </div></>
    );
};
  

export default Monthly;
