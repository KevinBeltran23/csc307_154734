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

    // fetch calls

    function fetchSettings() {
        const promise = fetch(
            `http://localhost:8000/settings?user=${userId}`,
            {
                method: "GET",
                headers: addAuthHeader()
            }
        );
        return promise;
    }

    function fetchItems() {
        const promise = fetch(
            `http://localhost:8000/todo?user=${userId}`,
            {
                method: "GET",
                headers: addAuthHeader()
            }
        );
        return promise;
    }

    function fetchEvents() {
        const promise = fetch(
            `http://localhost:8000/event?user=${userId}`,
            {
                method: "GET",
                headers: addAuthHeader()
            }
        );
        return promise;
    }

        
    function fetchClasses() {
        const promise = fetch(
            `http://localhost:8000/class?user=${userId}`,
            {
                method: "GET",
                headers: addAuthHeader()
            }
        );
        return promise;
    }

    function fetchCalendars() {
        const promise = fetch(
            `http://localhost:8000/calendar?user=${userId}`,
            {
                method: "GET",
                headers: addAuthHeader()
            }
        );
        return promise;
    }

    
    // login and signup api calls

    function loginUser(creds) {
        const promise = fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json().then((payload) => {
                        setToken(payload.token);
                        setIsAuthenticated(true);
                        setUserId(payload.userId);
                        setMessage(`Login successful; auth token saved`);
                        return true; // Indicate success
                    });
                } else {
                    setMessage(
                        `Login Error ${response.status}: ${response.statusText}`
                    );
                    return false; // Indicate failure
                }
            })
            .catch((error) => {
                setMessage(`Login Error: ${error}`);
                return false; // Indicate failure
            });
        return promise;
    }

    function signupUser(creds) {
        const promise = fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json().then((payload) => {
                        setToken(payload.token);
                        setIsAuthenticated(true);
                        setUserId(payload.userId);
                        setMessage(
                            `Signup successful for user: ${creds.username}; auth token saved`
                        );
                        return true; // Indicate success
                    });
                } else if (response.status === 409) {
                    setMessage(
                        `Signup failed for user: ${creds.username}; Username already taken`
                    );
                    return false; // Indicate failure
                } else {
                    console.log(creds);
                    setMessage(
                        `Signup Error ${response.status}: ${response.statusText}`
                    );
                    return false; // Indicate failure
                }
            })
            .catch((error) => {
                setMessage(`Signup Error: ${error}`);
                return false; // Indicate failure
            });
        return promise;
    }

    // settings api calls

    function updateSettings(newSetting) {
        postSetting(newSetting)
            .then((newSettingJson) => {
                setSettings((prevSettings) => [...prevSettings, newSettingJson]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editSetting(settingId) {
        const updatedSetting = {
            ...settings.find((setting) => setting._id === settingId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        putSetting(settingId, updatedSetting) // Pass itemId and updatedItem separately
            .then((updatedItemResponseJson) => {
                setSettings(
                    settings.map((setting) =>
                        setting._id === settingId ? updatedItemResponseJson : setting
                    )
                );
                //setTodoEditing(null);
                //setEditingText("");
            })
            .catch((error) => {
                setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    }
      
    function postSetting(setting) {
        const promise = fetch("http://localhost:8000/settings", {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(setting)
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Item created successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Post Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function deleteSetting(_id) {
        const promise = fetch(`http://localhost:8000/settings/${_id}`, {
            method: "DELETE",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
                if (response.status === 204) {
                    // Filter out the item with the specified _id and update the items list
                    const updated = settings.filter((item) => item._id !== _id);
                    setItems(updated);
                } else if (response.status === 404) {
                    console.log("Resource not found.");
                } else {
                    throw new Error(
                        "Failed to delete item. Status code: " + response.status
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return promise;
    }

    function putSetting(settingId, updatedSetting) {
        const promise = fetch(`http://localhost:8000/settings/${settingId}`, {
            method: "PUT",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updatedSetting)
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Setting updated successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`PUT Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    // api calls for todolist items

    function updateItems(newItem) {
        postItem(newItem)
            .then((newItemResponseJson) => {
                setItems((prevItems) => [...prevItems, newItemResponseJson]);
                console.log(items);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function postItem(item) {
        const promise = fetch("http://localhost:8000/todo", {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(item)
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Item created successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Post Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function deleteItem(_id) {
        const promise = fetch(`http://localhost:8000/todo/${_id}`, {
            method: "DELETE",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
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
            })
            .catch((error) => {
                console.error(error);
            });
        return promise;
    }

    function putItem(itemId, updatedItem) {
        const promise = fetch(`http://localhost:8000/todo/${itemId}`, {
            method: "PUT",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updatedItem)
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Item updated successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`PUT Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    // api calls for events

    function updateEvents(newEvent) {
        postEvent(newEvent)
            .then((newEventResponseJson) => {
                setEvents((prevEvents) => [...prevEvents, newEventResponseJson]);
                console.log(events);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editEvent(eventId) {
        const updatedEvent = {
            ...events.find((event) => event._id === eventId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        putEvent(eventId, updatedEvent) // Pass itemId and updatedItem separately
            .then((updatedEventResponseJson) => {
                setEvents(
                    events.map((event) =>
                        event._id === eventId ? updatedEventResponseJson : event
                    )
                );
                //setTodoEditing(null);
                //setEditingText("");
            })
            .catch((error) => {
                setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    }

    function postEvent(event) {
        const promise = fetch("http://localhost:8000/event", {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(event)
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Event created successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Post Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function deleteEvent(_id) {
        const promise = fetch(`http://localhost:8000/event/${_id}`, {
            method: "DELETE",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
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
            })
            .catch((error) => {
                console.error(error);
            });
        return promise;
    }

    function putEvent(eventId, updatedEvent) {
        const promise = fetch(`http://localhost:8000/event/${eventId}`, {
            method: "PUT",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updatedEvent)
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Event updated successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`PUT Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    // api calls for classes

    function updateClasses(newClass) {
        postClass(newClass)
            .then((newClassResponseJson) => {
                setClasses((prevClasses) => [...prevClasses, newClassResponseJson]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editClass(classId) {
        const updatedClass = {
            ...classes.find((clas) => clas._id === classId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        putClass(classId, updatedClass) // Pass itemId and updatedItem separately
            .then((updatedClassResponseJson) => {
                setClasses(
                    classes.map((clas) =>
                        clas._id === classId ? updatedClassResponseJson : clas
                    )
                );
                //setTodoEditing(null);
                //setEditingText("");
            })
            .catch((error) => {
                setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    }

    function postClass(clas) {
        const promise = fetch("http://localhost:8000/class", {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(clas)
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Class created successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Post Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function deleteClass(_id) {
        const promise = fetch(`http://localhost:8000/class/${_id}`, {
            method: "DELETE",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
                if (response.status === 204) {
                    // Filter out the class with the specified _id and update the classes list
                    const updated = calendars.filter((clas) => clas._id !== _id);
                    setClasses(updated);
                } else if (response.status === 404) {
                    console.log("Resource not found.");
                } else {
                    throw new Error(
                        "Failed to delete item. Status code: " + response.status
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return promise;
    }

    function putClass(classId, updatedClass) {
        const promise = fetch(`http://localhost:8000/class/${classId}`, {
            method: "PUT",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updatedClass)
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Class updated successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`PUT Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    // api calls for calendars

    function updateCalendars(newCalendar) {
        postCalendar(newCalendar)
            .then((newCalendarJson) => {
                setCalendars((prevCalendars) => [...prevCalendars, newCalendarJson]);
                console.log(calendars);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editCalendar(calendarId) {
        const updatedCalendar = {
            ...calendars.find((clas) => clas._id === calendarId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        putCalendar(calendarId, updatedCalendar) // Pass itemId and updatedItem separately
            .then((updatedCalendarResponseJson) => {
                setCalendars(
                    calendars.map((calendar) =>
                        calendar._id === calendarId ? updatedCalendarResponseJson : calendar
                    )
                );
                //setTodoEditing(null);
                //setEditingText("");
            })
            .catch((error) => {
                setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    }

    function postCalendar(calendar) {
        const promise = fetch("http://localhost:8000/calendar", {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(calendar)
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Calendar created successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Post Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function deleteCalendar(_id) {
        const promise = fetch(`http://localhost:8000/calendar/${_id}`, {
            method: "DELETE",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
                if (response.status === 204) {
                    // Filter out the calendar with the specified _id and update the items list
                    const updated = calendars.filter((calendar) => calendar._id !== _id);
                    setCalendars(updated);
                } else if (response.status === 404) {
                    console.log("Resource not found.");
                } else {
                    throw new Error(
                        "Failed to delete item. Status code: " + response.status
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return promise;
    }

    function putCalendar(calendarId, updatedCalendar) {
        const promise = fetch(`http://localhost:8000/calendar/${calendarId}`, {
            method: "PUT",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updatedCalendar)
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Calendar updated successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`PUT Error: ${error.message}`);
                throw error;
            });
        return promise;
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
                                fetchSettings={fetchSettings}
                                settings={settings}
                                setSettings={setSettings}

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

                                classes={classes}
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
                                fetchSettings={fetchSettings}
                                settings={settings}
                                setSettings={setSettings}
                                
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

                                classes={classes}
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

                                settings={settings}
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
