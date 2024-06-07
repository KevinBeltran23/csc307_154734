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

app.post("/registration", (req, res) => {
    const userToAdd = req.body;
    Service.addUser(userToAdd)
        .then((addedUser) => {
            res.status(201).json(addedUser);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// monthly page - Idk what would need to be done here

app.post("/monthly", authenticateUser, (req, res) => {
    // idk what this will do
    const eventToAdd = req.body;
    Service.addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/monthly", authenticateUser, (req, res) => {
    // get all the information for the monthly calendar for a user
});

// weekly page - Idk what would need to be done here

app.post("/weekly", authenticateUser, (req, res) => {
    // idk what this will do
    const eventToAdd = req.body;
    Service.addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/weekly", authenticateUser, (req, res) => {
    // get all the information for the weekly calendar for a user
});

// settings

app.get("/settings", authenticateUser, (req, res) => {
    const { language, bold, default_view, polytime, user } = req.query;

    Service.getSettings(user)
        .then((result) => {
            res.send({ settings_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});
 
// Update or create settings for a specific user
app.post("/settings", authenticateUser, (req, res) => {
    const settingToAdd = req.body;

    Service.addSetting(settingToAdd)
        .then((addedSetting) => {
            res.status(201).json(addedSetting);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// Update specific setting by ID
app.put("/settings/:id", authenticateUser, (req, res) => {
    const settingId = req.params.id; // Get the ID from the URL parameters
    const updatedSetting = req.body; // Get the updated item data from the request body

    Service.editSetting(settingId, updatedSetting)
        .then((editedSetting) => {
            res.status(200).json(editedSetting);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// Delete specific setting by ID
app.delete("/settings/:id", authenticateUser, (req, res) => {
    const id = req.params.id; // Get the ID from the URL parameters
    Service.deleteSettingById(id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// todo page - I think this is done

app.get("/todo", authenticateUser, (req, res) => {
    // get todo items for a user
    const { duedate, contents, user } = req.query;
    Service.getTodoItems(duedate, user)
        .then((result) => {
            res.send({ todo_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/todo", authenticateUser, (req, res) => {
    // add an item to the todo list
    const todoItemToAdd = req.body;
    Service.addTodoItem(todoItemToAdd)
        .then((addedItem) => {
            res.status(201).json(addedItem);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.put("/todo/:id", authenticateUser, (req, res) => {
    const itemId = req.params.id; // Get the ID from the URL parameters
    const updatedItem = req.body; // Get the updated item data from the request body

    Service.editTodoItem(itemId, updatedItem)
        .then((editedItem) => {
            res.status(200).json(editedItem);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/todo/:id", authenticateUser, (req, res) => {
    // delete an item from the todo list
    const id = req.params["id"];
    Service.deleteTodoItemById(id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// events - I think this is done now

app.get("/event", authenticateUser, (req, res) => {
    // get events for a user
    const { title, start, end, description, location, calendar, user } =
        req.query;
    Service.getEvents(start, calendar, user)
        .then((result) => {
            res.send({ events_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/event/:id", authenticateUser, (req, res) => {
    // get one events information
    const id = req.params["id"];
    Service.findEventById(id)
        .then((result) => {
            if (!result) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/event", authenticateUser, (req, res) => {
    // add an event for the user
    const eventToAdd = req.body;
    Service.addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.put("/event/:id", authenticateUser, (req, res) => {
    const eventId = req.params.id; // Get the ID from the URL parameters
    const updatedEvent = req.body; // Get the updated item data from the request body

    Service.editEvent(eventId, updatedEvent)
        .then((editedEvent) => {
            res.status(200).json(editedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/event/:id", authenticateUser, (req, res) => {
    // delete an event by id
    const id = req.params["id"];
    Service.deleteEventById(id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// class - I think this is done now

app.get("/class", authenticateUser, (req, res) => {
    // get classes for a user
    const { title, start, end, description, professor, calendar, user } =
        req.query;
    Service.getClasses(start, calendar, user)
        .then((result) => {
            res.send({ classes_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/class/:id", authenticateUser, (req, res) => {
    // get one classes information
    const id = req.params["id"];
    Service.findClassById(id)
        .then((result) => {
            if (!result) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/class", authenticateUser, (req, res) => {
    // add a class for the user
    const classToAdd = req.body;
    Service.addClass(classToAdd)
        .then((addedClass) => {
            res.status(201).json(addedClass);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/class/:id", authenticateUser, (req, res) => {
    // delete a class by id
    const id = req.params["id"];
    Service.deleteClassById(id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// calendar - I think this is done

app.get("/calendar", authenticateUser, (req, res) => {
    // get calendars for a user
    const { color, name, user } = req.query;
    Service.getCalendars(user)
        .then((result) => {
            res.send({ calendars_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/calendar/:id", (req, res) => {
    // get one calendars information
    const id = req.params["id"];
    Service.findCalendarById(id)
        .then((result) => {
            if (!result) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/calendar", authenticateUser, (req, res) => {
    // add a calendar for the user
    const calendarToAdd = req.body;
    Service.addCalendar(calendarToAdd)
        .then((addedCalendar) => {
            res.status(201).json(addedCalendar);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/calendar/:id", authenticateUser, (req, res) => {
    // delete a calendar by event id
    const id = req.params["id"];
    Service.deleteCalendarById(id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

// users - this is done

app.get("/users", authenticateUser, (req, res) => {
    // get users by username, password, both, or none
    const { username, password } = req.query; // Use req.query to get query parameters
    Service.getUsers(username, password)
        .then((result) => {
            res.send({ result: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/users/:id", authenticateUser, (req, res) => {
    // delete a users account by id
    const { id } = req.query;
    Service.deleteUserById(id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/users/:id", authenticateUser, (req, res) => {
    const id = req.params.id;
    Service.findUserById(id)
        .then((result) => {
            res.send({ result: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.put("/users/:id", authenticateUser, (req, res) => {
    const userId = req.params.id; // Get the ID from the URL parameters
    const updatedUser = req.body; // Get the updated item data from the request body

    Service.editEvent(userId, updatedUser)
        .then((editedUser) => {
            res.status(200).json(editedUser);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});
