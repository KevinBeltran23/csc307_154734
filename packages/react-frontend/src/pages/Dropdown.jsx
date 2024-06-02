import React, { useState } from "react";
import Popup from './Popup';
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

function Dropdown(opt) {
    const [selectedValue, setSelectedValue] = useState();
    const [popup, setPopup] = useState(false);
    const options = opt;

    const handleChange = event => {
        var val = event.target.value;
        setSelectedValue(val);
        // if Event or Calendar or To Do -> setPopup, build the popup
        if (val === "Event" || val === "Calendar" || val === "To Do Item") {
            setPopup(true);
        }
        // else -> fetch data
            // i'm thinking this would just be a fetch events? not sure
        else {
            console.log("hi!")
        }
        
    };

    // this function builds the popups for each request
    function create(val) {
        if (val === "Event") {
            var date = new Date().toDateString;
            //format(date, "MM/dd/yyyy hh:mm:ss");
            //console.log(date);
            return (
                <div>
                    Create Event
                    Start Date: <input type="date"></input>
                    Start Time: <input type="time" defaultValue="08:10"></input>
                    End Date: <input type="date"></input>
                    End Time: <input type="time" defaultValue="09:10"></input>
                </div>
            );
        }
        else if (val === "Calendar") {
            return (
                <input type="text" placeholder="Enter Calendar Name"></input>
            );
        }
    }

    return (
        <div>
            <select id = "dropdown" value={selectedValue} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                            {option.label}
                    </option>
                ))}
            </select>
            <Popup openPopup={popup} closePopup={() => setPopup(false)}>
                {/* it looks like this error is a VS Code thing */}
                {create(event.target.value)}
            </Popup>
        </div>
        );
       }


export default Dropdown;