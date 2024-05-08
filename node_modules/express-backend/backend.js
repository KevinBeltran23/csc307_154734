import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    // Fetch users based on name and/or job using userService.getUsers
    userService.getUsers(name, job)
        .then((result) => {
            res.send({ users_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

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
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService.addUser(userToAdd)
        .then((addedUser) => {
            res.status(201).json(addedUser);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.delete("/users/:id", (req, res) => {
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});