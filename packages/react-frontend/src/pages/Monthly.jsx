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
import "../components/Monthly.css"
import { PiDropSimple } from "react-icons/pi";
  
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
  
    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
      let currentDate = date;
      const week = [];
      for (let day = 0; day < 7; day++) {
        const cloneDate = currentDate;
        week.push(
          <div
            className={`monthly-day ${
              isSameMonth(currentDate, activeDate) ? "" : "monthly-inactiveDay"
            } ${isSameDay(currentDate, selectedDate) ? "monthly-selectedDay" : ""}
            ${isSameDay(currentDate, new Date()) ? "monthly-today" : ""}`}
          >
            {format(currentDate, "d")}
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
        <div className="monthly-dayContainer">
            {allWeeks}
        </div>
        );
    };

    function clock(s) {
        // https://www.educative.io/answers/how-to-create-a-dynamic-digital-clock-in-react
        const [date, setDate] = useState(new Date());
        var t;
        useEffect(() => {
          const interval = setInterval(() => {
            setDate(new Date());
          }, 1000);
    
          return () => clearInterval(interval);
        }, []);
    
        /*if (s) {
          t = date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
        }
        else {
          t = date.toLocaleTimeString();
        } */
    
        return (
          <div className="monthly-clock">
            {date.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"})}
          </div>
        );
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
    }
    function handleCalendarsDropdown() {
        // open calendars drop down
    }
    function handleToDoDropdown() {
        // open todo dropdown
    }
    function handleClickingOnEvent() {
        // implement functionality
    }

  
    return (
      <><button className="logout" onClick={props.logout}> Log Out Temporary Button </button>
      <div className="monthly-main-container">
        <div className='monthly-calendar-dropdown-container'>
          <div className='monthly-rectangle'>
            <button className='monthly-button-frame' onClick={handleCalendarsDropdown}>
              <span className='monthly-calendars'>Calendars</span>
              <div className='monthly-dropdown-arrow' />
            </button>
          </div>
        </div>
        <div className='monthly-todo-dropdown-container'>
          <div className='monthly-rectangle'>
            <button className='monthly-button-frame' onClick={handleToDoDropdown}>
              <span className='monthly-todo'>Todo</span>
              <div className='monthly-dropdown-arrow' />
            </button>
          </div>
        </div>
        {getHeader()}
        {clock()}
        <button className='monthly-monthly-view-frame' onClick={handleWeekly}>
          <span className='monthly-change-view'>Weekly View</span>
        </button>
        <button className='monthly-todo-view-frame' onClick={handleToDo}>
          <span className='monthly-change-view'>To Do</span>
        </button>
        <button className='monthly-settings-frame' onClick={handleSettings}>
          {/* <div className='weekly-gear' /> */}
          <span className='monthly-gear'></span>
        </button>
        <div className='monthly-download-frame'>
          <div className='monthly-download-icon' />
        </div>
        <button className='monthly-create-frame' onClick={handleCreate}>
          <span className='monthly-create'>Create</span>
          <div className='monthly-dropdown-arrow' />
        </button>
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
        <div className="monthly-divider-lines">
          <div className="monthly-line"></div>
          <div className="monthly-line"></div>
          <div className="monthly-line"></div>
          <div className="monthly-line"></div>
          <div className="monthly-line"></div>
          <div className="monthly-line"></div>
        </div>
        <div className="monthly-horiz-divider-lines">
          <div className="monthly-horiz-line"></div>
          <div className="monthly-horiz-line"></div>
          <div className="monthly-horiz-line"></div>
          <div className="monthly-horiz-line"></div>
        </div>

      </div></>
    );
};
  

export default Monthly;
