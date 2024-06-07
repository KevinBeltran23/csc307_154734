import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Service from "./services.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Wassup this is the Poly Planner");
});

// signup and login pages - done

app.post("/login", loginUser);

app.post("/signup", registerUser);

// registration page
app.post("/registration", async (req, res) => {
    try {
        const userToAdd = req.body;
        const addedUser = await Service.addUser(userToAdd);
        res.status(201).json(addedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// monthly page
app.post("/monthly", authenticateUser, async (req, res) => {
    try {
        const eventToAdd = req.body;
        const addedEvent = await Service.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/monthly", authenticateUser, async (req, res) => {
    try {
        // get all the information for the monthly calendar for a user
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// weekly page
app.post("/weekly", authenticateUser, async (req, res) => {
    try {
        const eventToAdd = req.body;
        const addedEvent = await Service.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/weekly", authenticateUser, async (req, res) => {
    try {
        // get all the information for the weekly calendar for a user
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// todo page
app.get("/todo", authenticateUser, async (req, res) => {
    try {
        const { duedate, contents, user } = req.query;
        const result = await Service.getTodoItems(duedate, user);
        res.send({ todo_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/todo", authenticateUser, async (req, res) => {
    try {
        const todoItemToAdd = req.body;
        const addedItem = await Service.addTodoItem(todoItemToAdd);
        res.status(201).json(addedItem);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/todo/:id", authenticateUser, async (req, res) => {
    try {
        const itemId = req.params.id; // Get the ID from the URL parameters
        const updatedItem = req.body; // Get the updated item data from the request body

        const editedItem = await Service.editTodoItem(itemId, updatedItem);
        res.status(200).json(editedItem);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/todo/:id", authenticateUser, async (req, res) => {
    try {
        // delete an item from the todo list
        const id = req.params["id"];
        const result = await Service.deleteTodoItemById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// events
app.get("/event", authenticateUser, async (req, res) => {
    try {
        // get events for a user
        const { title, start, end, description, location, calendar, user } = req.query;
        const result = await Service.getEvents(start, calendar, user);
        res.send({ events_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/event/:id", authenticateUser, async (req, res) => {
    try {
        // get one event's information
        const id = req.params["id"];
        const result = await Service.findEventById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/event", authenticateUser, async (req, res) => {
    try {
        // add an event for the user
        const eventToAdd = req.body;
        const addedEvent = await Service.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/event/:id", authenticateUser, async (req, res) => {
    try {
        const eventId = req.params.id; // Get the ID from the URL parameters
        const updatedEvent = req.body; // Get the updated item data from the request body

        const editedEvent = await Service.editEvent(eventId, updatedEvent);
        res.status(200).json(editedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/event/:id", authenticateUser, async (req, res) => {
    try {
        // delete an event by id
        const id = req.params["id"];
        const result = await Service.deleteEventById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Class
app.get("/class", authenticateUser, async (req, res) => {
    try {
        // get classes for a user
        const { title, start, end, description, professor, calendar, user } = req.query;
        const result = await Service.getClasses(start, calendar, user);
        res.send({ classes_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/class/:id", authenticateUser, async (req, res) => {
    try {
        // get one class's information
        const id = req.params["id"];
        const result = await Service.findClassById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/class", authenticateUser, async (req, res) => {
    try {
        // add a class for the user
        const classToAdd = req.body;
        const addedClass = await Service.addClass(classToAdd);
        res.status(201).json(addedClass);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/class/:id", authenticateUser, async (req, res) => {
    try {
        // delete a class by id
        const id = req.params["id"];
        const result = await Service.deleteClassById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Calendar
app.get("/calendar", authenticateUser, async (req, res) => {
    try {
        // get calendars for a user
        const { color, name, user } = req.query;
        const result = await Service.getCalendars(user);
        res.send({ calendars_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/calendar/:id", async (req, res) => {
    try {
        // get one calendar's information
        const id = req.params["id"];
        const result = await Service.findCalendarById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/calendar", authenticateUser, async (req, res) => {
    try {
        // add a calendar for the user
        const calendarToAdd = req.body;
        const addedCalendar = await Service.addCalendar(calendarToAdd);
        res.status(201).json(addedCalendar);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/calendar/:id", authenticateUser, async (req, res) => {
    try {
        // delete a calendar by event id
        const id = req.params["id"];
        const result = await Service.deleteCalendarById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Users
app.get("/users", authenticateUser, async (req, res) => {
    try {
        // get users by username, password, both, or none
        const { username, password } = req.query;
        const result = await Service.getUsers(username, password);
        res.send({ result: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/users/:id", authenticateUser, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Service.findUserById(id);
        res.send({ result: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/users/:id", authenticateUser, async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const editedUser = await Service.editUser(userId, updatedUser);
        res.status(200).json(editedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/users/:id", authenticateUser, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Service.deleteUserById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
