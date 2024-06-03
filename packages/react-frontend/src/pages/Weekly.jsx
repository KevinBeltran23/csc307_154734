import React, { useEffect, useState } from "react";
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
                <div className="weekly-currentWeek">
                    {format(activeDate, "MMMM yyyy")}
                </div>
            </div>
        );
    };

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

        return <div className="weekly-dayContainer">{allWeeks}</div>;
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
    function handleClickingOnEvent() {
        // implement functionality
    }

    var create_lst = [
        { value: "Create", label: "Create" },
        { value: "Event", label: "Event" },
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

    return (
      <div className="calendar-container">
        {allWeeks}
      </div>
    );
  };

  /*const getEvents = () => {
 
  } */

  const navigate = useNavigate();

  function handleSettings() {
    // go to settings page
    navigate('/settings');
  }
  function handleMonthly() {
    // go to weekly page
    navigate('/monthly');
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
    <><button className="logout" onClick={props.logout}> Log Out </button>
            <div className="calendar-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="calendar-todo-dropdown">
                        {Dropdown(cal_lst)}
                    </div>
                </div>
            </div>
            <div className="todo-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="calendar-todo-dropdown">
                        {Dropdown(cal_lst)}
                    </div>
                </div>
            </div>
       <div className="create-dropdown">{Dropdown(create_lst)}</div>    
          
      {getHeader()}
      <div className='the-clock'>
        <Clock />
      </div>
      <button className='change-view-frame' onClick={handleMonthly}>
        <span className='change-view'>Monthly View</span>
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

      <div className='weekly-time-container'>
        {/* Time slots */}
        <span className='weekly-time-slot'>8am</span>
        <span className='weekly-time-slot'>9am</span>
        <span className='weekly-time-slot'>10am</span>
        <span className='weekly-time-slot'>11am</span>
        <span className='weekly-time-slot'>12pm</span>
        <span className='weekly-time-slot'>1pm</span>
        <span className='weekly-time-slot'>2pm</span>
        <span className='weekly-time-slot'>3pm</span>
        <span className='weekly-time-slot'>4pm</span>
        <span className='weekly-time-slot'>5pm</span>
        <span className='weekly-time-slot'>6pm</span>
        <span className='weekly-time-slot'>7pm</span>
        <span className='weekly-time-slot'>8pm</span>
      </div>
      {/* <div className='weekly-expand' /> */}
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
}
export default Weekly;
