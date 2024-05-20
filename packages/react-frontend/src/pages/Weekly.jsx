import React from 'react';
import '../components/Weekly.css';


export default function Main() {
  return (
    <div className='main-container'>
      <div className='calendar-dropdown-container'>
        <div className='rectangle'>
          <button className='button-frame'>
            <span className='calendars'>Calendars</span>
            <div className='dropdown-arrow' />
          </button>
        </div>
      </div>
      <div className='todo-dropdown-container'>
        <div className='rectangle'>
          <button className='button-frame'>
            <span className='todo'>Todo</span>
            <div className='dropdown-arrow' />
          </button>
        </div>
      </div>

      <div className='top-left-nav-bar'>
        <button className='button-frame-1'>
          <span className='today'>Today</span>
        </button>
        <button className="arrow-frame left-arrow" />
        <button className=" arrow-frame right-arrow" />
        <span className='week-1'>Week 1</span>
      </div>

      <span className='time'>6:22 PM</span>

      <button className='monthly-view-frame'>
        <span className='change-view'>Monthly View</span>
      </button>

      <button className='todo-view-frame'>
        <span className='change-view'>ToDo</span>
      </button>

      <button className='settings-frame'>
        {/* <div className='gear' /> */}
        <span className='gear'></span>
      </button>

      <div className='download-frame'>
        <div className='download-icon' />
      </div>
      <button className='create-frame'>
        <span className='create'>Create</span>
        <div className='dropdown-arrow' />
      </button>


      <div className='days'>
        <span className='sun'>SUN</span>
        <span className='mon'>MON</span>
        <span className='tue'>TUE</span>
        <span className='wed'>WED</span>
        <span className='thu'>THU</span>
        <span className='fri'>FRI</span>
        <span className='sat'>SAT</span>
      </div>


      <div className='time-container'>
        {/* Time slots */}
        <span className='time-slot'>8am</span>
        <span className='time-slot'>9am</span>
        <span className='time-slot'>10am</span>
        <span className='time-slot'>11am</span>
        <span className='time-slot'>12pm</span>
        <span className='time-slot'>1pm</span>
        <span className='time-slot'>2pm</span>
        <span className='time-slot'>3pm</span>
        <span className='time-slot'>4pm</span>
        <span className='time-slot'>5pm</span>
        <span className='time-slot'>6pm</span>
        <span className='time-slot'>7pm</span>
        <span className='time-slot'>8pm</span>
      </div>

      {/* <div className='expand' /> */}

      {/* CalendarSquare */}
      <div className="calendar-square"></div>

      {/* DividerLines */}


      {/* DateSquares */}
      <div className="date-squares">
        <div className="date-square sunday-date-square"></div>
        <div className="date-square monday-date-square"></div>
        <div className="date-square tuesday-date-square"></div>
        <div className="date-square wednesday-date-square"></div>
        <div className="date-square thursday-date-square"></div>
        <div className="date-square friday-date-square"></div>
        <div className="date-square saturday-date-square"></div>
      </div>


    </div>
  );
}
