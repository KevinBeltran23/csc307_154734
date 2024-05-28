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
        /*{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }*/
    )
    .catch((error) => console.log(error));


// user-services

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

function findUserById(id) {
    return userModel.findById(id);
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}


// event-services

function getAllEvents() {
    return eventModel.find();
}

function getEvents(title, date) {
    let query = {};
    if (title && date) {
        query = { title: title, start: date };
    }
    return eventModel.find(query);
}

function addEvent(event) {
    const eventToAdd = new eventModel(event);
    const promise = eventToAdd.save();
    return promise;
}

function findEventById(id) {
    return eventModel.findById(id);
}

function deleteEventById(id) {
    return eventModel.findByIdAndDelete(id);
}


// calendar-services

function getAllCalendars() {
    return calendarModel.find();
}

function getCalendars(color, name) {
    let query = {};
    if (color && name) {
        query = { color: color, name: name };
    }
    return eventModel.find(query);
}

function addCalendar(calendar) {
    const calendarToAdd = new calendarModel(calendar);
    const promise = calendarToAdd.save();
    return promise;
}

function findCalendarById(id) {
    return calendarModel.findById(id);
}

function deleteCalendarById(id) {
    return calendarModel.findByIdAndDelete(id);
}


// class-services

function getAllClasses() {
    return classModel.find();
}

function getClasses(title, date) {
    let query = {};
    if (title && date) {
        query = { title: title, start: date };
    }
    return classModel.find(query);
}

function addClass(event) {
    const eventToAdd = new classModel(event);
    const promise = eventToAdd.save();
    return promise;
}

function findClassById(id) {
    return classModel.findById(id);
}

function deleteClassById(id) {
    return classModel.findByIdAndDelete(id);
}


// todo-services

function getAllTodoItems() {
    return todoModel.find();
}

function getTodoItems(due, user) {
    let query = {};
    if (due && user) {
        query = { duedate: due, user: user };
    }
    return todoModel.find(query);
}

function addTodoItem(item) {
    const itemToAdd = new todoModel(item);
    const promise = itemToAdd.save();
    return promise;
}

function findTodoItemById(id) {
    return todoModel.findById(id);
}

function deleteTodoItemById(id) {
    return todoModel.findByIdAndDelete(id);
}

export default {
  getUsers,
  getAllUsers,
  getUserByNameAndPassword,
  addUser,
  findUserById,
  deleteUserById,

  getEvents,
  getAllEvents,
  addEvent,
  findEventById,
  deleteEventById,

  getCalendars,
  getAllCalendars,
  addCalendar,
  deleteCalendarById,
  findCalendarById,

  getClasses,
  getAllClasses,
  addClass,
  deleteClassById,
  findClassById,

  getTodoItems,
  getAllTodoItems,
  addTodoItem,
  deleteTodoItemById,
  findTodoItemById
};
