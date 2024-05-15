import React from 'react';
import '../components/Weekly.css';


export default function Main() {
  return (
    <div className='main-container'>
      <div className='calendar-dropdown-container'>
        <div className='rectangle'>  {/*calendar*/}
          <button className='button-frame'>
            <span className='calendars'>Calendars</span>
            <div className='polygon' />
          </button>
        </div>
      </div>

      <div className='todo-dropdown-container'>
        <div className='rectangle'>  {/*todo*/}
          <button className='button-frame'>
            <span className='todo'>Todo</span>
            <div className='polygon' />
          </button>
        </div>
      </div>


      <div className='top-left-nav-bar'>
        <button className='button-frame-1'>
          <span className='today'>Today</span>
        </button>
        <div className='left-arrow' />
        <div className='right-arrow' />
        <span className='week-1'>Week 1</span>
      </div>
      <div className='ellipse' />
      <button className='change-view'>
        <span className='weekly-view'>Monthly View</span>
      </button>
      <div className='ellipse-2' />
      <div className='output-onlinepngtools' />
      <div className='download'>
        <div className='download-icon' />
      </div>
      <button className='frame'>
        <span className='create'>Create</span>
        <div className='polygon-3' />
      </button>
      <span className='time'>6:22 PM</span>
      <div className='line' />
      <button className='change-view-4'>
        <span className='weekly-view-5'>To Do</span>
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
      <div className='calendar-square'>
        <div className='divider-lines'>
          <div className='line-6' />
          <div className='line-7' />
          <div className='line-8' />
          <div className='line-9' />
          <div className='line-a' />
          <div className='line-b' />
        </div>
        <div className='date-squares'>
          <div className='sunday-date-square' />
          <div className='monday-date-square' />
          <div className='tuesday-date-square' />
          <div className='wednesday-date-square' />
          <div className='thursday-date-square' />
          <div className='friday-date-square' />
          <div className='saturday-date-square' />
        </div>
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
      <div className='expand' />
      <div className='rectangle-17'>
        <button className='frame-18'>
          <span className='to-do'>To Do</span>
          <div className='polygon-19' />
        </button>
      </div>
    </div>
  );
}
