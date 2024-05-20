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

      <div className='days-frame'>
        <span className='day'>SUN</span>
        <span className='day'>MON</span>
        <span className='day'>TUE</span>
        <span className='day'>WED</span>
        <span className='day'>THU</span>
        <span className='day'>FRI</span>
        <span className='day'>SAT</span>
      </div>

      {/* CalendarSquare */}
      <div className="calendar-square"></div>

      {/* DividerLines */}
      <div className="divider-lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* DateSquares */}
      {/*<div className="date-squares-frame">
        <span className="date-square">29</span>
        <div className="date-square"></div>
        <div className="date-square"></div>
        <div className="date-square"></div>
        <div className="date-square"></div>
        <div className="date-square"></div>
        <div className="date-square"></div>
    </div>*/}


    </div>
  );
}
