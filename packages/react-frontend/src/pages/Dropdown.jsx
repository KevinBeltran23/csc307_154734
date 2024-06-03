import React, { useState } from "react";
import Popup from "./Popup";
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

function Dropdown(props, opt = []) {
    const [selectedValue, setSelectedValue] = useState();
    const [popup, setPopup] = useState(false);
    const options = opt;

    const [todoItem, setTodoItem] = useState({
        duedate: "",
        contents: "",
        checked: false,
        user: props.userId
    });

    const [eventItem, setEventItem] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        location: "",
        calendar: "",
        user: props.userId
    });

    const [classItem, setClassItem] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        professor: "",
        calendar: "",
        user: props.userId
    });

    const [calendarItem, setCalendarItem] = useState({
        name: "",
        color: "",
        user: props.userId
    });

    const handleDropdownChange = (event) => {
        var val = event.target.value;
        setSelectedValue(val);
        if (val === "Event" || val === "Calendar" || val === "To Do Item" || val === "Class") {
            setPopup(true);
        } else {
            console.log("hi!");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (selectedValue === "Event") {
            if (name === "date") {
                value = new Date(value);
            }
            setEventItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        } else if (selectedValue === "Calendar") {
            setCalendarItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        } else if (selectedValue === "To Do Item") {
            if (name === "date") {
                value = new Date(value);
            }
            setTodoItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        } else if (selectedValue === "Class") {
            if (name === "date") {
                value = new Date(value);
            }
            setClassItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedValue === "Event") {
            props.postEvent(eventItem);
            console.log("Submitting Event:", eventItem);
        } else if (selectedValue === "Calendar") {
            props.postCalendar(calendarItem);
            console.log("Submitting Calendar:", calendarItem);
        } else if (selectedValue === "To Do Item") {
            props.postItem(todoItem);
            console.log("Submitting To Do Item:", todoItem);
        } else if (selectedValue === "Class") {
            props.postClass(classItem);
            console.log("Submitting Class:", classItem);
        }

        // Reset the form and close the popup
        setTodoItem({
            duedate: "",
            contents: "",
            checked: false,
            user: props.userId
        });
        setEventItem({
            title: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            description: "",
            location: "",
            calendar: "",
            user: props.userId
        });
        setClassItem({
            title: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            description: "",
            professor: "",
            calendar: "",
            user: props.userId
        });
        setCalendarItem({
            name: "",
            color: "",
            user: props.userId
        });
        setPopup(false);
    };

    function create(val) {
        if (val === "Event") {
            return (
                <div>
                    <p>Create Event</p>
                    <p>
                        Title: <input id="inputs" type="text" name="title" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Start Date: <input id="inputs" type="date" name="startDate" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        End Date: <input id="inputs" type="date" name="endDate" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Start Time: <input id="inputs" type="time" name="startTime" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        End Time: <input id="inputs" type="time" name="endTime" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Description: <input id="inputs" type="text" name="description" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Location: <input id="inputs" type="text" name="location" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Calendar: <input id="inputs" type="text" name="calendar" onChange={handleInputChange}></input>
                    </p>
                </div>
            );
        } else if (val === "Calendar") {
            return (
                <div>
                    <p>Create Calendar</p>
                    <p>
                        Name: <input type="text" placeholder="Enter Calendar Name" name="name" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Color: <input type="text" placeholder="Enter Color Hex Code" name="color" onChange={handleInputChange}></input>
                    </p>
                </div>
            );
        } else if (val === "To Do Item") {
            return (
                <div>
                    <p>Create To Do Item</p>
                    <p>
                        Due Date: <input id="inputs" type="date" name="duedate" value={todoItem.duedate} onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Contents: <input id="inputs" type="text" name="contents" value={todoItem.contents} onChange={handleInputChange}></input>
                    </p>
                </div>
            );
        } else if (val === "Class") {
            return (
                <div>
                    <p>Create Class</p>
                    <p>
                        Title: <input id="inputs" type="text" name="title" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Start Date: <input id="inputs" type="date" name="startDate" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        End Date: <input id="inputs" type="date" name="endDate" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Start Time: <input id="inputs" type="time" name="startTime" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        End Time: <input id="inputs" type="time" name="endTime" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Description: <input id="inputs" type="text" name="description" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Professor: <input id="inputs" type="text" name="professor" onChange={handleInputChange}></input>
                    </p>
                    <p>
                        Calendar: <input id="inputs" type="text" name="calendar" onChange={handleInputChange}></input>
                    </p>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div>
            <select id="dropdown" value={selectedValue} onChange={handleDropdownChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <Popup openPopup={popup} closePopup={() => setPopup(false)}>
                <form onSubmit={handleSubmit}>
                    {create(selectedValue)}
                    <button type="submit">Submit</button>
                </form>
            </Popup>
        </div>
    );
}

export default Dropdown;