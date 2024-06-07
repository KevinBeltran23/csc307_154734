import dotenv from "dotenv";
dotenv.config();

//imports
import express from "express";
import cors from "cors";
import Service from "./services.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
// const port = 8000;

var process = {
    env: {}
};

const corsOptions = {
    origin: "https://green-sand-07ee7761e.5.azurestaticapps.net",
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://green-sand-07ee7761e.5.azurestaticapps.net"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// can listen at azure port or at localhost 8000
app.listen(process.env.PORT || 80, () => {
    console.log(`REST API is listening.`);
});

app.get("/", (req, res) => {
    res.send("Wassup this is the Poly Planner");
});

// signup and login pages - done

app.post("/login", loginUser);

app.post("/signup", registerUser);

app.post("/registration", async (req, res) => {
    const userToAdd = req.body;
    try {
        const addedUser = await Service.addUser(userToAdd);
        res.status(201).json(addedUser);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// monthly page - Idk what would need to be done here

app.post("/monthly", authenticateUser, async (req, res) => {
    // idk what this will do
    const eventToAdd = req.body;
    try {
        const addedEvent = await Service.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// weekly page - Idk what would need to be done here

app.post("/weekly", authenticateUser, async (req, res) => {
    // idk what this will do
    const eventToAdd = req.body;
    try {
        const addedEvent = await Service.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// settings page - gonna need a lot of work

app.get("/settings", authenticateUser, async (req, res) => {
    // get todo items for a user
    try {
        const result = await Service.getSettings(req.query);
        res.send({ settings_list: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.post("/settings", authenticateUser, async (req, res) => {
    // add an item to the todo list
    const settingToChange = req.body;
    try {
        const changedSetting = await Service.addSetting(settingToChange);
        res.status(201).json(changedSetting);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.put("/setting/:id", authenticateUser, async (req, res) => {
    const settingId = req.params.id; // Get the ID from the URL parameters
    const updatedSetting = req.body; // Get the updated item data from the request body
    try {
        const editedSetting = await Service.editSetting(
            settingId,
            updatedSetting
        );
        res.status(200).json(editedSetting);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.delete("/setting/:id", authenticateUser, async (req, res) => {
    // delete an item from the todo list
    const id = req.params["id"];
    try {
        const result = await Service.deleteSettingById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// todo page - I think this is done

app.get("/todo", authenticateUser, async (req, res) => {
    // get todo items for a user
    const { duedate, user } = req.query;
    try {
        const result = await Service.getTodoItems(duedate, user);
        res.send({ todo_list: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.post("/todo", authenticateUser, async (req, res) => {
    // add an item to the todo list
    const todoItemToAdd = req.body;
    try {
        const addedItem = await Service.addTodoItem(todoItemToAdd);
        res.status(201).json(addedItem);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.put("/todo/:id", authenticateUser, async (req, res) => {
    const itemId = req.params.id; // Get the ID from the URL parameters
    const updatedItem = req.body; // Get the updated item data from the request body
    try {
        const editedItem = await Service.editTodoItem(itemId, updatedItem);
        res.status(200).json(editedItem);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.delete("/todo/:id", authenticateUser, async (req, res) => {
    // delete an item from the todo list
    const id = req.params["id"];
    try {
        const result = await Service.deleteTodoItemById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// events - I think this is done now

app.get("/event", authenticateUser, async (req, res) => {
    // get events for a user
    const { start, calendar, user } = req.query;
    try {
        const result = await Service.getEvents(start, calendar, user);
        res.send({ events_list: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.get("/event/:id", authenticateUser, async (req, res) => {
    // get one event's information
    const id = req.params["id"];
    try {
        const result = await Service.findEventById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.post("/event", authenticateUser, async (req, res) => {
    // add an event for the user
    const eventToAdd = req.body;
    try {
        const addedEvent = await Service.addEvent(eventToAdd);
        res.status(201).json(addedEvent);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.put("/event/:id", authenticateUser, async (req, res) => {
    const eventId = req.params.id; // Get the ID from the URL parameters
    const updatedEvent = req.body; // Get the updated item data from the request body
    try {
        const editedEvent = await Service.editEvent(eventId, updatedEvent);
        res.status(200).json(editedEvent);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.delete("/event/:id", authenticateUser, async (req, res) => {
    // delete an event by id
    const id = req.params["id"];
    try {
        const result = await Service.deleteEventById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// class - I think this is done now

app.get("/class", authenticateUser, async (req, res) => {
    // get classes for a user
    const { start, calendar, user } = req.query;
    try {
        const result = await Service.getClasses(start, calendar, user);
        res.send({ classes_list: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.get("/class/:id", authenticateUser, async (req, res) => {
    // get one class's information
    const id = req.params["id"];
    try {
        const result = await Service.findClassById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.post("/class", authenticateUser, async (req, res) => {
    // add a class for the user
    const classToAdd = req.body;
    try {
        const addedClass = await Service.addClass(classToAdd);
        res.status(201).json(addedClass);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.delete("/class/:id", authenticateUser, async (req, res) => {
    // delete a class by id
    const id = req.params["id"];
    try {
        const result = await Service.deleteClassById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// calendar - I think this is done

app.get("/calendar", authenticateUser, async (req, res) => {
    // get calendars for a user
    const { user } = req.query;
    try {
        const result = await Service.getClasses(user);
        res.send({ calendars_list: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.get("/calendar/:id", async (req, res) => {
    // get one calendar's information
    const id = req.params["id"];
    try {
        const result = await Service.findCalendarById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.post("/calendar", authenticateUser, async (req, res) => {
    // add a calendar for the user
    const calendarToAdd = req.body;
    try {
        const addedCalendar = await Service.addCalendar(calendarToAdd);
        res.status(201).json(addedCalendar);
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.delete("/calendar/:id", authenticateUser, async (req, res) => {
    // delete a calendar by event id
    const id = req.params["id"];
    try {
        const result = await Service.deleteCalendarById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

// users - this is done

app.get("/users", authenticateUser, async (req, res) => {
    // get users by username, password, both, or none
    const { username, password } = req.query; // Use req.query to get query parameters
    try {
        const result = await Service.getUsers(username, password);
        res.send({ result: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.delete("/user/:id", authenticateUser, async (req, res) => {
    // delete a user's account by id
    const id = req.params["id"];
    try {
        const result = await Service.deleteUserById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});

app.get("/users/:id", authenticateUser, async (req, res) => {
    // get users by id
    const id = req.params["id"];
    try {
        const result = await Service.findUserById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Internal Server Error");
    }
});
