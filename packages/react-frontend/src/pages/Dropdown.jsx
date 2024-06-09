import React, { useState, useEffect } from "react";
import Popup from "./Popup";

function Dropdown(props, opt = []) {
    const [selectedValue, setSelectedValue] = useState(); // to change value in dropdown
    const [popup, setPopup] = useState(false); // to trigger popup
    const options = opt;

    /* these are for the create dropdown */
    const [todoItem, setTodoItem] = useState({
        // to create todo item
        duedate: "",
        contents: "",
        checked: false,
        user: props.userId
    });

    const [eventItem, setEventItem] = useState({
        // to create event
        title: "",
        start: "",
        end: "",
        description: "",
        location: "",
        calendar: null,
        user: props.userId
    });

    const [classItem, setClassItem] = useState({
        // to create class
        title: "",
        start: "",
        end: "",
        description: "",
        professor: "",
        calendar: null,
        user: props.userId
    });

    const [calendarItem, setCalendarItem] = useState({
        // to create calendar
        name: "",
        color: "",
        user: props.userId
    });

    useEffect(() => {
        // useEffect to fetch calendars
        props
            .fetchCalendars()
            .then((res) => res.json())
            .then((json) => {
                const calendars = json.calendars_list;
                props.setCalendars(calendars);
            })
            .catch((error) => {
                console.log(error);
                props.setMessage(`Fetch Error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        // useEffect to fetch classes
        props
            .fetchClasses()
            .then((res) => res.json())
            .then((json) => {
                const classes = json.classes_list;
                props.setClasses(classes);
            })
            .catch((error) => {
                console.log(error);
                props.setMessage(`Fetch Error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        // useEffect to fetch calendar events
        props
            .fetchEvents()
            .then((res) => res.json())
            .then((json) => {
                const events = json.events_list;
                props.setEvents(events);
            })
            .catch((error) => {
                console.log(error);
                props.setMessage(`Fetch Error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        // useEffect to fetch todo items
        props
            .fetchItems()
            .then((res) => res.json())
            .then((json) => {
                const sortedItems = json.todo_list.sort(
                    (a, b) => new Date(a.duedate) - new Date(b.duedate)
                );
                props.setItems(sortedItems);
            })
            .catch((error) => {
                console.log(error);
                props.setMessage(`Fetch Error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        // useEffect to return the user
        props
            .fetchUser()
            .then((res) => res.json())
            .then((json) => {
                const user = json.result;
                props.setUser(user);
            })
            .catch((error) => {
                console.log(error);
                props.setMessage(`Fetch Error: ${error.message}`);
            });
    }, []);

    const handleDropdownChange = (event) => {
        // to check if dropdown changes
        var val = event.target.value;
        setSelectedValue(val);
        if (
            val === "Event" || // these are all to trigger the respective popup window
            val === "Calendar" ||
            val === "To Do Item" ||
            val === "Class"
        ) {
            setPopup(true); // if anything else, no popup
        } else {
            // pass
        }
    };

    const handleInputChange = (event) => {
        // gets the inputs from the text boxes in the popups
        var { name, value } = event.target;

        if (selectedValue === "Event") {
            setEventItem((prevItem) => ({
                ...prevItem,
                [name]: value
            }));
        } else if (selectedValue === "Class") {
            setClassItem((prevItem) => ({
                ...prevItem,
                [name]: value
            }));
        } else if (selectedValue === "Calendar") {
            setCalendarItem((prevItem) => ({
                ...prevItem,
                [name]: value
            }));
        } else if (selectedValue === "To Do Item") {
            setTodoItem((prevItem) => ({
                ...prevItem,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        // submits the changes from the text boxes, closes popup
        event.preventDefault();

        if (selectedValue === "Event") {
            props.updateEvents(eventItem);
            console.log("Submitting Event:", eventItem);
        } else if (selectedValue === "Calendar") {
            props.updateCalendars(calendarItem);
            console.log("Submitting Calendar:", calendarItem);
        } else if (selectedValue === "To Do Item") {
            props.updateItems(todoItem);
            console.log("Submitting To Do Item:", todoItem);
        } else if (selectedValue === "Class") {
            props.updateClasses(classItem);
            console.log("Submitting Class:", classItem);
        }
        setPopup(false);
    };

    /* this function takes in a value telling it which popup to display */
    function create(val) {
        if (val === "Event") {
            return (
                // returns the inside of the event popup
                <div>
                    <p>Create Event</p>
                    <p>
                        Title:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Start Date:{" "}
                        <input
                            id="inputs"
                            type="date"
                            name="start"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        End Date:{" "}
                        <input
                            id="inputs"
                            type="date"
                            name="end"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Description:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Location:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="location"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Calendar:{" "}
                        <input
                            id="inputs"
                            type="objectId"
                            name="calendar"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                </div>
            );
        } else if (val === "Calendar") {
            // returns inside of calendar popup
            return (
                <div>
                    <p>Create Calendar</p>
                    <p>
                        Name:{" "}
                        <input
                            type="text"
                            placeholder="Enter Calendar Name"
                            name="name"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Color:{" "}
                        <input
                            type="text"
                            placeholder="Enter Color Hex Code"
                            name="color"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                </div>
            );
        } else if (val === "To Do Item") {
            // returns inside of to do popup
            return (
                <div>
                    <p>Create To Do Item</p>
                    <p>
                        Due Date:{" "}
                        <input
                            id="inputs"
                            type="date"
                            name="duedate"
                            value={todoItem.duedate}
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Contents:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="contents"
                            value={todoItem.contents}
                            onChange={handleInputChange}
                        ></input>
                    </p>
                </div>
            );
        } else if (val === "Class") {
            // returns inside of class popup
            return (
                <div>
                    <p>Create Class</p>
                    <p>
                        Title:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Start Date:{" "}
                        <input
                            id="inputs"
                            type="date"
                            name="start"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        End Date:{" "}
                        <input
                            id="inputs"
                            type="date"
                            name="end"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Description:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Professor:{" "}
                        <input
                            id="inputs"
                            type="text"
                            name="professor"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                    <p>
                        Calendar:{" "}
                        <input
                            id="inputs"
                            type="objectId"
                            name="calendar"
                            onChange={handleInputChange}
                        ></input>
                    </p>
                </div>
            );
        } else {
            return null;
        }
    }

    /* this returns the dropdown itself */
    return (
        <div>
            <select
                id="dropdown"
                value={selectedValue}
                onChange={handleDropdownChange}
            >
                {options.map(
                    (
                        option // takes in a list of options for the dropdown
                    ) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    )
                )}
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
