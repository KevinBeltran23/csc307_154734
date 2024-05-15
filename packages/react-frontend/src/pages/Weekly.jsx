import React from 'react';
import '../components/Weekly.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='rectangle'>
        <button className='button-frame'>
          <span className='calendars'>Calendars</span>
          <div className='polygon' />
        </button>
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
      <div className='download' />
      <button className='frame'>
        <span className='create'>Create</span>
        <div className='polygon-3' />
      </button>
      <span className='time-span'>6:22 PM</span>
      <div className='line' />
      <button className='change-view-4'>
        <span className='weekly-view-5'>To Do</span>
      </button>
      <span className='sun'>SUN</span>
      <span className='sat'>SAT</span>
      <span className='fri'>FRI</span>
      <span className='thu'>THU</span>
      <span className='wed'>WED</span>
      <span className='tue'>TUE</span>
      <span className='mon'>MON</span>
      <div className='calendar-grid' />
      <span className='text-f'>8am</span>
      <span className='text-10'>9am</span>
      <span className='text-11'>10am</span>
      <span className='text-12'>11am</span>
      <span className='text-13'>12pm</span>
      <div className='expand' />
      <div className='rectangle-6'>
        <button className='frame-7'>
          <span className='to-do'>To Do</span>
          <div className='polygon-8' />
        </button>
      </div>
      <span className='pm'>1pm</span>
      <span className='pm-9'>2pm</span>
      <span className='pm-a'>3pm</span>
      <span className='pm-b'>4pm</span>
      <span className='pm-c'>5pm</span>
      <span className='pm-d'>6pm</span>
      <span className='pm-e'>7pm</span>
      <span className='pm-f'>8pm</span>
    </div>
  );
}
