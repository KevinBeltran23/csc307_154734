import React, { useState } from "react";
import Popup from './Popup';

function Dropdown(opt) {
    const [selectedValue, setSelectedValue] = useState();
    const [popup, setPopup] = useState(false);
    const options = opt;

    const handleChange = event => {
        const val = event.target.value;
        console.log(val);
        setSelectedValue(val);
        if (val === "Event" || val === "Calendar" || val === "To Do Item") {
            setPopup(true);
        }
        // if Event or Calendar or To Do -> setPopup, build the popup
        // else -> fetch data
            // i'm thinking this would just be a fetch events? not sure
        else {
            console.log("hi!")
        }
        
    };

    function create(val) {
        if (val === "Event") {
            return (
                <div> hello </div>
            );
        }
        else if (val === "Calendar") {
            return (
                <input type="date"></input>
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