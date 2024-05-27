
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import '../components/Weekly.css';

function Weekly(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  const getHeader = () => {
    return (
      <div className="weekly-header">
        <div
          className="weekly-todayButton"
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}
        >
          Today
        </div>
        <AiOutlineLeft
          className="weekly-navIcon"
          onClick={() => setActiveDate(subWeeks(activeDate, 1))}
        />
        <AiOutlineRight
          className="weekly-navIcon"
          onClick={() => setActiveDate(addWeeks(activeDate, 1))}
        />
        <div className="weekly-currentWeek">{format(activeDate, "MMMM yyyy")}</div>
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
          className={`weekly-day ${isSameMonth(currentDate, activeDate) ? "" : "weekly-inactiveDay"
            } ${isSameDay(currentDate, selectedDate) ? "weekly-selectedDay" : ""}
              ${isSameDay(currentDate, new Date()) ? "weekly-today" : ""}`}
        >
          {format(currentDate, "d")}
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
        generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
      );
      currentDate = addDays(currentDate, 7);
    }

    return (
      <div className="weekly-dayContainer">
        {allWeeks}
      </div>
    );
  };

  /*const getEvents = () => {
 
  } */
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
        {date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
      </div>
    );
  }

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
    <div className='weekly-main-container'>
      <div className='weekly-calendar-dropdown-container'>
        <div className='weekly-rectangle'>
          <button className='weekly-button-frame' onClick={handleCalendarsDropdown}>
            <span className='weekly-calendars'>Calendars</span>
            <div className='weekly-dropdown-arrow' />
          </button>
        </div>
      </div>
      <div className='weekly-todo-dropdown-container'>
        <div className='weekly-rectangle'>
          <button className='weekly-button-frame' onClick={handleToDoDropdown}>
            <span className='weekly-todo'>Todo</span>
            <div className='weekly-dropdown-arrow' />
          </button>
        </div>
      </div>

      {getHeader()}
      <span className='weekly-time'>6:22 PM</span>
      <button className='weekly-monthly-view-frame' onClick={handleMonthly}>
        <span className='weekly-change-view'>Monthly View</span>
      </button>
      <button className='weekly-todo-view-frame' onClick={handleToDo}>
        <span className='weekly-change-view'>To Do</span>
      </button>
      <button className='weekly-settings-frame' onClick={handleSettings}>
        {/* <div className='weekly-gear' /> */}
        <span className='weekly-gear'></span>
      </button>
      <div className='weekly-download-frame'>
        <div className='weekly-download-icon' />
      </div>
      <button className='weekly-create-frame' onClick={handleCreate}>
        <span className='weekly-create'>Create</span>
        <div className='weekly-dropdown-arrow' />
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
      <div className='weekly-days-frame'>
        <span className='weekly-dayHeader'>SUN</span>
        <span className='weekly-dayHeader'>MON</span>
        <span className='weekly-dayHeader'>TUE</span>
        <span className='weekly-dayHeader'>WED</span>
        <span className='weekly-dayHeader'>THU</span>
        <span className='weekly-dayHeader'>FRI</span>
        <span className='weekly-dayHeader'>SAT</span>
      </div>
      {getDates()}
      {/* DividerLines */}
      <div className="weekly-divider-lines">
        <div className="weekly-line"></div>
        <div className="weekly-line"></div>
        <div className="weekly-line"></div>
        <div className="weekly-line"></div>
        <div className="weekly-line"></div>
        <div className="weekly-line"></div>
      </div>
    </div>
  );
}
export default Weekly;

