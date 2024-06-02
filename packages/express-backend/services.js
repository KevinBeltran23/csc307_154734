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

function getUsers(username, password) {
    let query = {};
    if (username && password) {
        query = { username: username, password: password };
        return userModel.findOne({ username: username, password: password });
    }
    else if (username) {
        query = { username: username};
    }
    else if (password) {
        query = { password: password};
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

function getEvents(start, calendar, userId) {
    let query = {};
    if (start) {
        query.start = start;
    }
    if (calendar){
        query.calendar = calendar;
    }
    if (userId) {
        query.user = userId;
    }
    return eventModel.find(query);
}

function addEvent(event) {
    const eventToAdd = new eventModel(event);
    const promise = eventToAdd.save();
    return promise;
}

function editEvent(eventId, updatedEvent) {
    const promise = eventModel.findByIdAndUpdate(
        eventId,             // The ID of the item to update
        updatedEvent,        // The updated item data
        { new: true }       // Return the updated document
    ).exec();
    return promise;
}

function findEventById(id) {
    return eventModel.findById(id);
}

function deleteEventById(id) {
    return eventModel.findByIdAndDelete(id);
}


// calendar-services

function getCalendars(userId) {
    let query = {};
    if (userId) {
        query.user = userId;
    }
    return calendarModel.find(query);
}

function addCalendar(calendar) {
    const calendarToAdd = new calendarModel(calendar);
    const promise = calendarToAdd.save();
    return promise;
}

function editCalendar(calendarId, updatedCalendar) {
    const promise = classModel.findByIdAndUpdate(
        calendarId,             // The ID of the item to update
        updatedCalendar,        // The updated item data
        { new: true }       // Return the updated document
    ).exec();
    return promise;
}

function findCalendarById(id) {
    return calendarModel.findById(id);
}

function deleteCalendarById(id) {
    return calendarModel.findByIdAndDelete(id);
}


// class-services

function getClasses(start, calendar, userId) {
    let query = {};
    if (start) {
        query.start = start;
    }
    if (calendar){
        query.calendar = calendar;
    }
    if (userId) {
        query.user = userId;
    }
    return classModel.find(query);
}

function addClass(event) {
    const eventToAdd = new classModel(event);
    const promise = eventToAdd.save();
    return promise;
}

function editClass(classId, updatedClass) {
    const promise = classModel.findByIdAndUpdate(
        classId,             // The ID of the item to update
        updatedClass,        // The updated item data
        { new: true }       // Return the updated document
    ).exec();
    return promise;
}

function findClassById(id) {
    return classModel.findById(id);
}

function deleteClassById(id) {
    return classModel.findByIdAndDelete(id);
}


// todo-services

function getTodoItems(duedate, userId) {
    let query = {};
    if (duedate){
        query.duedate = duedate;
    }
    if (userId) {
        query.user = userId;
    }
    return todoModel.find(query);
}

function addTodoItem(item) {
    const itemToAdd = new todoModel(item);
    const promise = itemToAdd.save();
    return promise;
}

function editTodoItem(itemId, updatedItem) {
    const promise = todoModel.findByIdAndUpdate(
        itemId,             // The ID of the item to update
        updatedItem,        // The updated item data
        { new: true }       // Return the updated document
    ).exec();
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
  getUserByNameAndPassword,
  addUser,
  findUserById,
  deleteUserById,

  getEvents,
  addEvent,
  findEventById,
  deleteEventById,
  editEvent,

  getCalendars,
  addCalendar,
  deleteCalendarById,
  findCalendarById,
  editCalendar,

  getClasses,
  addClass,
  deleteClassById,
  findClassById,
  editClass,

  getTodoItems,
  addTodoItem,
  deleteTodoItemById,
  findTodoItemById,
  editTodoItem
};
