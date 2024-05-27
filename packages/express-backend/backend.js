import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import userService from "./user-services.js";
import auth, { registerUser, loginUser, authenticateUser } from "./auth.js";

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

// signup page

app.post("/signup", registerUser);

app.post("/registration", (req, res) => {
    const userToAdd = req.body;
    userService
        .addUser(userToAdd)
        .then((addedUser) => {
            res.status(201).json(addedUser);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});


// login page

app.post("/login", loginUser);

// events


app.get("/event", authenticateUser, (req, res) => { // get all the events for a user
    const { name, job } = req.query;
    userService
        .getUsers(name, job)
        .then((result) => {
            res.send({ users_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/event", authenticateUser, (req, res) => { // add an event for the user
    const eventToAdd = req.body;
    userService
        .addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});


// monthly page

app.post("/monthly", authenticateUser, (req, res) => { // add an event to the monthly calendar
    const eventToAdd = req.body;
    userService
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

app.post("/weekly", authenticateUser, (req, res) => { // add an event to the weekly calendar
    const eventToAdd = req.body;
    userService
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


// todo page : not implemented

app.post("/todo", authenticateUser, (req, res) => {  // add an item to the todo list
    const eventToAdd = req.body;
    userService
        .addEvent(eventToAdd)
        .then((addedEvent) => {
            res.status(201).json(addedEvent);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.get("/todo", authenticateUser, (req, res) => {  // get all of the todo list items

});

app.delete("/todo/:id", authenticateUser, (req, res) => { // delete an item from the todo list 
    const id = req.params["id"];
    userService.deleteUserById(id)
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


// settings page : not implemented

app.post("/settings", authenticateUser, (req, res) => { // change a setting in the settings page
    const settingToChange = req.body;
    userService
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


// misc

app.get("/users", authenticateUser, (req, res) => { // get all users
    userService.getAllUsers()
        .then((result) => {
            res.send({ users_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

/*old stuff

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    userService.findUserById(id)
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
}); */
