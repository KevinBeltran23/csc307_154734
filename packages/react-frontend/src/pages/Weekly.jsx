// src/pages/Weekly.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Weekly.css';


function Weekly(props) {

    const navigate = useNavigate(); 

    function handleToday() {
        // go to current month
    }

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
        <div className='weekly-main-container'>
        <div className='weekly-calendar-dropdown-container'>
            <div className='weekly-rectangle'>
            <button className='weekly-button-frame'>
                <span className='weekly-calendars'>Calendars</span>
                <div className='weekly-dropdown-arrow' />
            </button>
            </div>
        </div>
        <div className='weekly-todo-dropdown-container'>
            <div className='weekly-rectangle'>
            <button className='weekly-button-frame'>
                <span className='weekly-todo'>Todo</span>
                <div className='weekly-dropdown-arrow' />
            </button>
            </div>
        </div>

        <div className='weekly-top-left-nav-bar'>
            <button className='weekly-button-frame-1'>
            <span className='weekly-today'>Today</span>
            </button>
            <button className="arrow-frame left-arrow" />
            <button className=" arrow-frame right-arrow" />
            <span className='weekly-week-1'>Week 1</span>
        </div>

        <span className='weekly-time'>6:22 PM</span>

        <button className='weekly-monthly-view-frame'>
            <span className='weekly-change-view'>Monthly View</span>
        </button>

        <button className='weekly-todo-view-frame'>
            <span className='weekly-change-view'>ToDo</span>
        </button>

        <button className='weekly-settings-frame'>
            {/* <div className='weekly-gear' /> */}
            <span className='weekly-gear'></span>
        </button>

        <div className='weekly-download-frame'>
            <div className='weekly-download-icon' />
        </div>
        <button className='weekly-create-frame'>
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
            <span className='weekly-day'>SUN</span>
            <span className='weekly-day'>MON</span>
            <span className='weekly-day'>TUE</span>
            <span className='weekly-day'>WED</span>
            <span className='weekly-day'>THU</span>
            <span className='weekly-day'>FRI</span>
            <span className='weekly-day'>SAT</span>
        </div>

        {/* CalendarSquare */}
        <div className="weekly-calendar-square"></div>

        {/* DividerLines */}
        <div className="weekly-divider-lines">
            <div className="weekly-line"></div>
            <div className="weekly-line"></div>
            <div className="weekly-line"></div>
            <div className="weekly-line"></div>
            <div className="weekly-line"></div>
            <div className="weekly-line"></div>
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

export default Weekly;
