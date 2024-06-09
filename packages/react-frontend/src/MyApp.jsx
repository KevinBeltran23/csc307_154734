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
    const URL = "https://154734.azurewebsites.net/";

    const INVALID_TOKEN = "INVALID_TOKEN";
    var [token, setToken] = useState(
        localStorage.getItem("token") || INVALID_TOKEN
    );
    var [userId, setUserId] = useState(localStorage.getItem("userId") || 0);
    var [message, setMessage] = useState("");
    var [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    var [items, setItems] = useState([]);
    var [events, setEvents] = useState([]);
    var [calendars, setCalendars] = useState([]);
    var [classes, setClasses] = useState([]);
    var [user, setUser] = useState([]);

    // state maintenance

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAuthenticated", isAuthenticated.toString());
        localStorage.setItem("user", user);
    }, [token, userId, isAuthenticated, user]);

    // add this to every API call for authentication
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

    // remove all user data
    function logoutUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");
        localStorage.removeItem("user", user);
        setToken(INVALID_TOKEN);
        setIsAuthenticated(false);
        setUserId(0);
        setUser(null);
        setMessage(`Logged out successfully`);

        // Remove the body class that sets the background image
        document.body.classList.remove("body-with-image");
        document.body.classList.remove("bold-text");
    }

    // Fetch calls
    async function fetchUser() {
        const response = await fetch(`${URL}users/${userId}`, {
            method: "GET",
            headers: addAuthHeader()
        });
        return response;
    }

    async function fetchItems() {
        const response = await fetch(`${URL}todo?user=${userId}`, {
            method: "GET",
            headers: addAuthHeader()
        });
        return response;
    }

    async function fetchEvents() {
        const response = await fetch(`${URL}event?user=${userId}`, {
            method: "GET",
            headers: addAuthHeader()
        });
        return response;
    }

    async function fetchClasses() {
        const response = await fetch(`${URL}class?user=${userId}`, {
            method: "GET",
            headers: addAuthHeader()
        });
        return response;
    }

    async function fetchCalendars() {
        const response = await fetch(`${URL}calendar?user=${userId}`, {
            method: "GET",
            headers: addAuthHeader()
        });
        return response;
    }

    // Login and signup API calls
    async function loginUser(creds) {
        try {
            const response = await fetch(`${URL}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(creds)
            });

            if (response.status === 200) {
                const payload = await response.json();
                setToken(payload.token);
                setIsAuthenticated(true);
                setUserId(payload.userId);
                setUser(creds);
                setMessage(`Login successful; auth token saved`);
                return true; // Indicate success
            } else {
                setMessage(
                    `Login Error ${response.status}: ${response.statusText}`
                );
                return false; // Indicate failure
            }
        } catch (error) {
            setMessage(`Login Error: ${error}`);
            return false; // Indicate failure
        }
    }

    async function signupUser(creds) {
        try {
            const response = await fetch(`${URL}signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(creds)
            });

            if (response.status === 201) {
                const payload = await response.json();
                setToken(payload.token);
                setIsAuthenticated(true);
                setUserId(payload.userId);
                setUser(creds);
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
            setMessage(`Signup Error: ${error}`);
            return false; // Indicate failure
        }
    }

    // edit the user state
    async function putUser(userId, updatedUser) {
        try {
            const response = await fetch(`${URL}users/${userId}`, {
                method: "PUT",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(updatedUser)
            });

            if (response.status === 200) {
                setMessage("Setting updated successfully");
                const json = await response.json();
                if (json) {
                    return json;
                } else {
                    console.log("No JSON data in response");
                    return updatedUser; // Return the updated user data if response is empty
                }
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

    // Function to update items
    async function updateItems(newItem) {
        try {
            const newItemResponseJson = await postItem(newItem);
            setItems((prevItems) => [...prevItems, newItemResponseJson]);
            console.log(items);
        } catch (error) {
            console.log(error);
        }
    }

    // ToDo API calls

    // Function to post an item
    async function postItem(item) {
        try {
            const response = await fetch(`${URL}todo`, {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(item)
            });

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

    // Function to delete an item
    async function deleteItem(_id) {
        try {
            const response = await fetch(`${URL}todo/${_id}`, {
                method: "DELETE",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                })
            });

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

    // Function to update an item
    async function putItem(itemId, updatedItem) {
        try {
            const response = await fetch(`${URL}todo/${itemId}`, {
                method: "PUT",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(updatedItem)
            });

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

    // Function to update events
    async function updateEvents(newEvent) {
        try {
            const newEventResponseJson = await postEvent(newEvent);
            setEvents((prevEvents) => [...prevEvents, newEventResponseJson]);
            console.log(events);
        } catch (error) {
            console.log(error);
        }
    }

    // Event API calls

    // Function to edit an event
    async function editEvent(eventId) {
        const updatedEvent = {
            ...events.find((event) => event._id === eventId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        try {
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

    // Function to post an event
    async function postEvent(event) {
        try {
            const response = await fetch(`${URL}event`, {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(event)
            });

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

    // Function to delete an event
    async function deleteEvent(_id) {
        try {
            const response = await fetch(`${URL}event/${_id}`, {
                method: "DELETE",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                })
            });

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

    // Function to update an event
    async function putEvent(eventId, updatedEvent) {
        try {
            const response = await fetch(`${URL}event/${eventId}`, {
                method: "PUT",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(updatedEvent)
            });

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

    // Function to update classes
    async function updateClasses(newClass) {
        try {
            const newClassResponseJson = await postClass(newClass);
            setClasses((prevClasses) => [...prevClasses, newClassResponseJson]);
        } catch (error) {
            console.log(error);
        }
    }

    // class API calls

    // Function to edit a class
    async function editClass(classId) {
        const updatedClass = {
            ...classes.find((clas) => clas._id === classId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        try {
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

    // Function to post a class
    async function postClass(clas) {
        try {
            const response = await fetch(`${URL}class`, {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(clas)
            });

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

    // Function to delete a class
    async function deleteClass(_id) {
        try {
            const response = await fetch(`${URL}class/${_id}`, {
                method: "DELETE",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                })
            });

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

    // Function to update a class
    async function putClass(classId, updatedClass) {
        try {
            const response = await fetch(`${URL}class/${classId}`, {
                method: "PUT",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(updatedClass)
            });

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

    // Function to update calendars
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

    // Function to edit a calendar
    async function editCalendar(calendarId) {
        const updatedCalendar = {
            ...calendars.find((clas) => clas._id === calendarId),
            // whatever fields are to be editted here
            user: userId // Ensure the user ID is included
        };

        try {
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

    // API calls for calendars

    // Function to post a calendar
    async function postCalendar(calendar) {
        try {
            const response = await fetch(`${URL}calendar`, {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(calendar)
            });
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

    // Function to delete a calendar
    async function deleteCalendar(_id) {
        try {
            const response = await fetch(`${URL}calendar/${_id}`, {
                method: "DELETE",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                })
            });
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

    // Function to update a calendar
    async function putCalendar(calendarId, updatedCalendar) {
        try {
            const response = await fetch(`${URL}calendar/${calendarId}`, {
                method: "PUT",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(updatedCalendar)
            });
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
                                putUser={putUser}
                                fetchUser={fetchUser}
                                user={user}
                                userId={userId}
                                setUser={setUser}
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
                                putUser={putUser}
                                fetchUser={fetchUser}
                                user={user}
                                userId={userId}
                                setUser={setUser}
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
                        path="/weekly"
                        element={
                            <PrivateRoute
                                element={Weekly}
                                isAuthenticated={isAuthenticated}
                                message={message}
                                setMessage={setMessage}
                                logout={logoutUser}
                                addAuthHeader={addAuthHeader}
                                putUser={putUser}
                                fetchUser={fetchUser}
                                user={user}
                                userId={userId}
                                setUser={setUser}
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
                                putUser={putUser}
                                fetchUser={fetchUser}
                                user={user}
                                userId={userId}
                                setUser={setUser}
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
                </Routes>
            </div>
        </Router>
    );
}

export default MyApp;
