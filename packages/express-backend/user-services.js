import mongoose from "mongoose";
import userModel from "./user.js";
import eventModel from "./event.js";
import todoModel from "./todo-item.js";
import classModel from "./class.js";
import calendarModel from "./calendar.js";

mongoose.set("debug", true);

mongoose
    .connect(
        "mongodb+srv://Karen:karen@154754.qdl82np.mongodb.net/?retryWrites=true&w=majority&appName=154754",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .catch((error) => console.log(error));

  // new functions

  function getAllUsers() {
    return userModel.find();
  }

function getUsers(username, password) {
    let query = {};
    if (username && password) {
        query = { name: username, password: password };
    }
    return userModel.find(query);
}

function getUserByNameAndPassword(username, password) {
    return userModel.findOne({ username: username, password: password });
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function addEvent(event) {
    const eventToAdd = new eventModel(event);
    const promise = eventToAdd.save();
    return promise;
}

export default {
  addUser,
  addEvent,
  getUsers,
  getUserByNameAndPassword,
  getAllUsers
};
