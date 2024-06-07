import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import Login from "./pages/Login";
import Monthly from "./pages/Monthly";
import ToDo from "./pages/ToDo";
import Weekly from "./pages/Weekly";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import PrivateRoute from "./PrivateRoute";

function MyApp() {
    // important variables
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(
        localStorage.getItem("token") || INVALID_TOKEN
    );
    const [userId, setUserId] = useState(localStorage.getItem("userId") || 0);
    const [message, setMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    const [items, setItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendars, setCalendars] = useState([]);
    const [classes, setClasses] = useState([]);
    const [settings, setSettings] = useState([]);

    // other stuff

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    }, [token, userId, isAuthenticated]);

    function addAuthHeader(otherHeaders = {}) {
        if (token === INVALID_TOKEN) {
            return otherHeaders;
        } else {
            return {
                ...otherHeaders,
                Authorization: `Bearer ${token}`
            };
        }
    }

    function logoutUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");
        setToken(INVALID_TOKEN);
        setIsAuthenticated(false);
        setUserId(0);
        setMessage(`Logged out successfully`);
    }

    async function fetchSettings() {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/settings?user=${userId}`,
                {
                    method: "GET",
                    headers: addAuthHeader()
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    async function fetchItems() {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/todo?user=${userId}`,
                {
                    method: "GET",
                    headers: addAuthHeader()
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    async function fetchEvents() {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/event?user=${userId}`,
                {
                    method: "GET",
                    headers: addAuthHeader()
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    async function fetchClasses() {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/class?user=${userId}`,
                {
                    method: "GET",
                    headers: addAuthHeader()
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    async function fetchCalendars() {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/calendar?user=${userId}`,
                {
                    method: "GET",
                    headers: addAuthHeader()
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    // login and signup api calls

    async function loginUser(creds) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(creds)
                }
            );

            if (response.status === 200) {
                const payload = await response.json();
                setToken(payload.token);
                setIsAuthenticated(true);
                setUserId(payload.userId);
                setMessage(`Login successful; auth token saved`);
                return true; // Indicate success
            } else {
                setMessage(
                    `Login Error ${response.status}: ${response.statusText}`
                );
                return false; // Indicate failure
            }
        } catch (error) {
            console.log(error);
            setMessage(`Login Error: ${error}`);
            return false; // Indicate failure
        }
    }

    async function signupUser(creds) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(creds)
                }
            );

            if (response.status === 201) {
                const payload = await response.json();
                setToken(payload.token);
                setIsAuthenticated(true);
                setUserId(payload.userId);
                setMessage(
                    `Signup successful for user: ${creds.username}; auth token saved`
                );
                return true; // Indicate success
            } else if (response.status === 409) {
                setMessage(
                    `Signup failed for user: ${creds.username}; Username already taken`
                );
                return false; // Indicate failure
            } else {
                setMessage(
                    `Signup Error ${response.status}: ${response.statusText}`
                );
                return false; // Indicate failure
            }
        } catch (error) {
            console.log(error);
            setMessage(`Signup Error: ${error}`);
            return false; // Indicate failure
        }
    }

    async function fetchSettings() {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/settings?user=${userId}`,
                {
                    method: "GET",
                    headers: addAuthHeader()
                }
            );
            return await response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    async function updateSettings(newSetting) {
        try {
            const newSettingJson = await postSetting(newSetting);
            setSettings((prevSettings) => [...prevSettings, newSettingJson]);
        } catch (error) {
            console.log(error);
        }
    }

    async function editSetting(settingId) {
        try {
            const updatedSetting = {
                ...settings.find((setting) => setting._id === settingId),
                // whatever fields are to be edited here
                user: userId // Ensure the user ID is included
            };
            const updatedItemResponseJson = await putSetting(
                settingId,
                updatedSetting
            );
            setSettings(
                settings.map((setting) =>
                    setting._id === settingId
                        ? updatedItemResponseJson
                        : setting
                )
            );
        } catch (error) {
            setMessage(`Update Error: ${error.message}`);
            console.log(error);
        }
    }

    async function postSetting(setting) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/settings",
                {
                    method: "POST",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(setting)
                }
            );
            if (response.status === 200 || response.status === 201) {
                setMessage("Item created successfully");
                return await response.json();
            } else {
                setMessage(
                    `Post Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `Post Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`Post Error: ${error.message}`);
            throw error;
        }
    }

    async function deleteSetting(_id) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/settings/${_id}`,
                {
                    method: "DELETE",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    })
                }
            );
            if (response.status === 204) {
                // Filter out the item with the specified _id and update the items list
                const updated = settings.filter((item) => item._id !== _id);
                setSettings(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error(
                    "Failed to delete item. Status code: " + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function putSetting(settingId, updatedSetting) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/settings/${settingId}`,
                {
                    method: "PUT",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(updatedSetting)
                }
            );
            if (response.status === 200) {
                setMessage("Setting updated successfully");
                return await response.json();
            } else {
                setMessage(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`PUT Error: ${error.message}`);
            throw error;
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetchItems();
                const json = await res.json();
                const sortedItems = json.todo_list.sort(
                    (a, b) => new Date(a.duedate) - new Date(b.duedate)
                );
                setItems(sortedItems);
            } catch (error) {
                console.log(error);
                setMessage(`Fetch Error: ${error.message}`);
            }
        }
        fetchData();
    }, []);

    async function updateItems(newItem) {
        try {
            const newItemResponseJson = await postItem(newItem);
            setItems((prevItems) => [...prevItems, newItemResponseJson]);
            console.log(items);
        } catch (error) {
            console.log(error);
        }
    }

    async function postItem(item) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/todo",
                {
                    method: "POST",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(item)
                }
            );
            if (response.status === 200 || response.status === 201) {
                setMessage("Item created successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `Post Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `Post Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`Post Error: ${error.message}`);
            throw error;
        }
    }

    async function deleteItem(_id) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/todo/${_id}`,
                {
                    method: "DELETE",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    })
                }
            );
            if (response.status === 204) {
                // Filter out the item with the specified _id and update the items list
                const updated = items.filter((item) => item._id !== _id);
                setItems(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error(
                    "Failed to delete item. Status code: " + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function putItem(itemId, updatedItem) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/todo/${itemId}`,
                {
                    method: "PUT",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(updatedItem)
                }
            );
            if (response.status === 200) {
                setMessage("Item updated successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`PUT Error: ${error.message}`);
            throw error;
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetchEvents();
                const json = await res.json();
                const events = json.events_list;
                setEvents(events);
            } catch (error) {
                console.log(error);
                setMessage(`Fetch Error: ${error.message}`);
            }
        }
        fetchData();
    }, []);

    async function updateEvents(newEvent) {
        try {
            const newEventResponseJson = await postEvent(newEvent);
            setEvents((prevEvents) => [...prevEvents, newEventResponseJson]);
            console.log(events);
        } catch (error) {
            console.log(error);
        }
    }

    async function editEvent(eventId) {
        try {
            const updatedEvent = {
                ...events.find((event) => event._id === eventId),
                // whatever fields are to be edited here
                user: userId // Ensure the user ID is included
            };
            const updatedEventResponseJson = await putEvent(
                eventId,
                updatedEvent
            );
            setEvents(
                events.map((event) =>
                    event._id === eventId ? updatedEventResponseJson : event
                )
            );
        } catch (error) {
            setMessage(`Update Error: ${error.message}`);
            console.log(error);
        }
    }

    async function postEvent(event) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/event",
                {
                    method: "POST",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(event)
                }
            );
            if (response.status === 200 || response.status === 201) {
                setMessage("Event created successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `Post Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `Post Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`Post Error: ${error.message}`);
            throw error;
        }
    }

    async function deleteEvent(_id) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/event/${_id}`,
                {
                    method: "DELETE",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    })
                }
            );
            if (response.status === 204) {
                // Filter out the event with the specified _id and update the events list
                const updated = events.filter((event) => event._id !== _id);
                setEvents(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error(
                    "Failed to delete event. Status code: " + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function putEvent(eventId, updatedEvent) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/event/${eventId}`,
                {
                    method: "PUT",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(updatedEvent)
                }
            );
            if (response.status === 200) {
                setMessage("Event updated successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`PUT Error: ${error.message}`);
            throw error;
        }
    }
    // api calls for classes
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetchClasses();
                const json = await res.json();
                const classes = json.classes_list;
                setClasses(classes);
            } catch (error) {
                console.log(error);
                setMessage(`Fetch Error: ${error.message}`);
            }
        }
        fetchData();
    }, []);

    async function updateClasses(newClass) {
        try {
            const newClassResponseJson = await postClass(newClass);
            setClasses((prevClasses) => [...prevClasses, newClassResponseJson]);
        } catch (error) {
            console.log(error);
        }
    }

    async function editClass(classId) {
        try {
            const updatedClass = {
                ...classes.find((clas) => clas._id === classId),
                // whatever fields are to be edited here
                user: userId // Ensure the user ID is included
            };
            const updatedClassResponseJson = await putClass(
                classId,
                updatedClass
            );
            setClasses(
                classes.map((clas) =>
                    clas._id === classId ? updatedClassResponseJson : clas
                )
            );
        } catch (error) {
            setMessage(`Update Error: ${error.message}`);
            console.log(error);
        }
    }

    async function postClass(clas) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/class",
                {
                    method: "POST",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(clas)
                }
            );
            if (response.status === 200 || response.status === 201) {
                setMessage("Class created successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `Post Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `Post Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`Post Error: ${error.message}`);
            throw error;
        }
    }

    async function deleteClass(_id) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/class/${_id}`,
                {
                    method: "DELETE",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    })
                }
            );
            if (response.status === 204) {
                // Filter out the class with the specified _id and update the classes list
                const updated = classes.filter((clas) => clas._id !== _id);
                setClasses(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error(
                    "Failed to delete item. Status code: " + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function putClass(classId, updatedClass) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/class/${classId}`,
                {
                    method: "PUT",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(updatedClass)
                }
            );
            if (response.status === 200) {
                setMessage("Class updated successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`PUT Error: ${error.message}`);
            throw error;
        }
    }

    // api calls for calendars

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetchCalendars();
                const json = await res.json();
                const calendars = json.calendars_list;
                setCalendars(calendars);
            } catch (error) {
                console.log(error);
                setMessage(`Fetch Error: ${error.message}`);
            }
        }
        fetchData();
    }, []);

    async function updateCalendars(newCalendar) {
        try {
            const newCalendarJson = await postCalendar(newCalendar);
            setCalendars((prevCalendars) => [
                ...prevCalendars,
                newCalendarJson
            ]);
            console.log(calendars);
        } catch (error) {
            console.log(error);
        }
    }

    async function editCalendar(calendarId) {
        try {
            const updatedCalendar = {
                ...calendars.find((calendar) => calendar._id === calendarId),
                // whatever fields are to be edited here
                user: userId // Ensure the user ID is included
            };
            const updatedCalendarResponseJson = await putCalendar(
                calendarId,
                updatedCalendar
            );
            setCalendars(
                calendars.map((calendar) =>
                    calendar._id === calendarId
                        ? updatedCalendarResponseJson
                        : calendar
                )
            );
        } catch (error) {
            setMessage(`Update Error: ${error.message}`);
            console.log(error);
        }
    }

    async function postCalendar(calendar) {
        try {
            const response = await fetch(
                "http://154734.azurewebsites.net/calendar",
                {
                    method: "POST",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(calendar)
                }
            );
            if (response.status === 200 || response.status === 201) {
                setMessage("Calendar created successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `Post Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `Post Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`Post Error: ${error.message}`);
            throw error;
        }
    }

    async function deleteCalendar(_id) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/calendar/${_id}`,
                {
                    method: "DELETE",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    })
                }
            );
            if (response.status === 204) {
                // Filter out the calendar with the specified _id and update the items list
                const updated = calendars.filter(
                    (calendar) => calendar._id !== _id
                );
                setCalendars(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error(
                    "Failed to delete item. Status code: " + response.status
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function putCalendar(calendarId, updatedCalendar) {
        try {
            const response = await fetch(
                `http://154734.azurewebsites.net/calendar/${calendarId}`,
                {
                    method: "PUT",
                    headers: addAuthHeader({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(updatedCalendar)
                }
            );
            if (response.status === 200) {
                setMessage("Calendar updated successfully");
                return await response.json(); // Return the JSON response for chaining
            } else {
                setMessage(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
                throw new Error(
                    `PUT Error ${response.status}: ${response.statusText}`
                );
            }
        } catch (error) {
            setMessage(`PUT Error: ${error.message}`);
            throw error;
        }
    }

    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                handleSubmit={loginUser}
                                message={message}
                                setMessage={setMessage}
                                isAuthenticated={isAuthenticated}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <SignUp
                                handleSubmit={signupUser}
                                message={message}
                                setMessage={setMessage}
                            />
                        }
                    />
                    <Route
                        path="/monthly"
                        element={
                            <PrivateRoute
                                element={Monthly}
                                isAuthenticated={isAuthenticated}
                                message={message}
                                setMessage={setMessage}
                                logout={logoutUser}
                                addAuthHeader={addAuthHeader}
                                userId={userId}
                                items={items}
                                setItems={setItems}
                                postItem={postItem}
                                putItem={putItem}
                                deleteItem={deleteItem}
                                fetchItems={fetchItems}
                                updateItems={updateItems}
                                events={events}
                                setEvents={setEvents}
                                postEvent={postEvent}
                                putEvent={putEvent}
                                deleteEvent={deleteEvent}
                                fetchEvents={fetchEvents}
                                updateEvents={updateEvents}
                                editEvent={editEvent}
                                calendars={calendars}
                                setCalendars={setCalendars}
                                postCalendar={postCalendar}
                                putCalendar={putCalendar}
                                deleteCalendar={deleteCalendar}
                                fetchCalendars={fetchCalendars}
                                updateCalendars={updateCalendars}
                                editCalendar={editCalendar}
                                classes={calendars}
                                setClasses={setClasses}
                                postClass={postClass}
                                putClass={putClass}
                                deleteClass={deleteClass}
                                fetchClasses={fetchClasses}
                                updateClasses={updateClasses}
                                editClass={editClass}
                            />
                        }
                    />
                    <Route
                        path="/todo"
                        element={
                            <PrivateRoute
                                element={ToDo}
                                isAuthenticated={isAuthenticated}
                                message={message}
                                setMessage={setMessage}
                                logout={logoutUser}
                                addAuthHeader={addAuthHeader}
                                userId={userId}
                                items={items}
                                setItems={setItems}
                                postItem={postItem}
                                putItem={putItem}
                                deleteItem={deleteItem}
                                fetchItems={fetchItems}
                            />
                        }
                    />
                    <Route
                        path="/weekly"
                        element={
                            <PrivateRoute
                                element={Weekly}
                                isAuthenticated={isAuthenticated}
                                message={message}
                                setMessage={setMessage}
                                logout={logoutUser}
                                addAuthHeader={addAuthHeader}
                                userId={userId}
                            />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute
                                element={Settings}
                                isAuthenticated={isAuthenticated}
                                message={message}
                                setMessage={setMessage}
                                logout={logoutUser}
                                addAuthHeader={addAuthHeader}
                                userId={userId}
                                settings={events}
                                setSettings={setSettings}
                                postSetting={postSetting}
                                putSetting={putSetting}
                                deleteSetting={deleteSetting}
                                fetchSettings={fetchSettings}
                                updateSettings={updateSettings}
                                editSetting={editSetting}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default MyApp;
