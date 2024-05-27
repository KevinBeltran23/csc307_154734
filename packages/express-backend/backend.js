import dotenv from 'dotenv';
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

// NOTE: Arguments for these calls will certainly need to be modified when implementing them fully
//       I have simply added some existing parameters as placeholders


// signup and login pages

app.post("/login", loginUser);

app.post("/signup", registerUser);

app.post("/registration", (req, res) => {
    const userToAdd = req.body;
    Service
        .addUser(userToAdd)
        .then((addedUser) => {
            res.status(201).json(addedUser);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});


// monthly page

app.post("/monthly", authenticateUser, (req, res) => { // idk what this will do
    const eventToAdd = req.body;
    Service
        .addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/monthly", authenticateUser, (req, res) => { // get all the information for the monthly calendar for a user

});


// weekly page

app.post("/weekly", authenticateUser, (req, res) => { // idk what this will do
    const eventToAdd = req.body;
    Service
        .addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/weekly", authenticateUser, (req, res) => { // get all the information for the weekly calendar for a user

});


// settings page 

app.post("/settings", authenticateUser, (req, res) => { // change a setting in the settings page probably
    const settingToChange = req.body;
    Service
        .changeSetting(settingToChange)
        .then((changedSetting) => {
            res.status(201).json(changedSetting);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/settings", authenticateUser, (req, res) => { // retrieve the saved settings for a user

});


// todo page 

app.post("/todo", authenticateUser, (req, res) => {  // add an item to the todo list
    const todoItemToAdd = req.body;
    Service
        .addEvent(todoItemToAdd)
        .then((addedItem) => {
            res.status(201).json(addedItem);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/todo", authenticateUser, (req, res) => { // get all the events for a user
    const { duedate, user } = req.query;
    Service
        .getTodoItems(duedate, user)
        .then((result) => {
            res.send({ todo_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/todo/:id", authenticateUser, (req, res) => { // delete an item from the todo list 
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

app.get("/todo/:id", (req, res) => { // get one todo items information
    const id = req.params["id"];
    Service.findTodoItemById(id)
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


// events

app.get("/event", authenticateUser, (req, res) => { // get all the events for a user
    const { title, start } = req.query;
    Service
        .getEvents(title, start)
        .then((result) => {
            res.send({ event_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/event", authenticateUser, (req, res) => { // add an event for the user
    const eventToAdd = req.body;
    Service
        .addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/event/:id", (req, res) => { // get one events information
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


app.delete("/event/:id", authenticateUser, (req, res) => { // delete an event by id 
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


// users 

app.get("/users", authenticateUser, (req, res) => { // get all users 
    Service.getAllUsers()
        .then((result) => {
            res.send({ users_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});


app.delete("/user/:id", authenticateUser, (req, res) => { // delete a users account by id
    const id = req.params["id"];
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


app.get("/users/:id", (req, res) => { // get users by id
    const id = req.params["id"];
    Service.findUserById(id)
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


// class

app.get("/class", authenticateUser, (req, res) => { // get all the classes for a user
    const { title, start } = req.query;
    Service
        .getClasses(title, start)
        .then((result) => {
            res.send({ class_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/class", authenticateUser, (req, res) => { // add a class for the user
    const classToAdd = req.body;
    Service
        .addClass(classToAdd)
        .then((addedClass) => {
            res.status(201).json(addedClass);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/class/:id", (req, res) => { // get one classes information
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


app.delete("/class/:id", authenticateUser, (req, res) => { // delete a class by id 
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


// calendar

app.get("/calendar", authenticateUser, (req, res) => { // get all the calendars for a user
    const { color, name } = req.query;
    Service
        .getCalendars(color, name)
        .then((result) => {
            res.send({ calendar_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/calendar", authenticateUser, (req, res) => { // add a calendar for the user
    const calendarToAdd = req.body;
    Service
        .addCalendar(calendarToAdd)
        .then((addedCalendar) => {
            res.status(201).json(addedCalendar);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/calendar/:id", (req, res) => { // get one calendars information
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


app.delete("/calendar/:id", authenticateUser, (req, res) => { // delete a calendar by event id 
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
