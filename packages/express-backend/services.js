import mongoose from "mongoose";
import userModel from "./user.js";
import eventModel from "./event.js";
import todoModel from "./todo-item.js";
import classModel from "./class.js";
import calendarModel from "./calendar.js";
import settingModel from "./settings.js";

mongoose.set("debug", true);

var process = {
    env: {}
};

mongoose.connect(process.env.MONGO).catch((error) => console.log(error));

// user-services

async function getUsers(username, password) {
    let query = {};
    if (username && password) {
        query = { username: username, password: password };
        return await userModel.findOne({
            username: username,
            password: password
        });
    } else if (username) {
        query = { username: username };
    } else if (password) {
        query = { password: password };
    }
    return await userModel.find(query);
}

async function getUserByNameAndPassword(username, password) {
    return await userModel.findOne({ username: username, password: password });
}

async function addUser(user) {
    const userToAdd = new userModel(user);
    return await userToAdd.save();
}

async function editUser(userId, updatedUser) {
    return await userModel
        .findByIdAndUpdate(userId, updatedUser, { new: true })
        .exec();
}

async function findUserById(id) {
    return await userModel.findById(id);
}

async function deleteUserById(id) {
    return await userModel.findByIdAndDelete(id);
}

// event-services

async function getEvents(start, calendar, userId) {
    let query = {};
    if (start) {
        query.start = start;
    }
    if (calendar) {
        query.calendar = calendar;
    }
    if (userId) {
        query.user = userId;
    }
    return await eventModel.find(query);
}

async function addEvent(event) {
    const eventToAdd = new eventModel(event);
    return await eventToAdd.save();
}

async function editEvent(eventId, updatedEvent) {
    return await eventModel
        .findByIdAndUpdate(eventId, updatedEvent, { new: true })
        .exec();
}

async function findEventById(id) {
    return await eventModel.findById(id);
}

async function deleteEventById(id) {
    return await eventModel.findByIdAndDelete(id);
}

// calendar-services

async function getCalendars(userId) {
    let query = {};
    if (userId) {
        query.user = userId;
    }
    return await calendarModel.find(query);
}

async function addCalendar(calendar) {
    const calendarToAdd = new calendarModel(calendar);
    return await calendarToAdd.save();
}

async function editCalendar(calendarId, updatedCalendar) {
    return await calendarModel
        .findByIdAndUpdate(calendarId, updatedCalendar, { new: true })
        .exec();
}

async function findCalendarById(id) {
    return await calendarModel.findById(id);
}

async function deleteCalendarById(id) {
    return await calendarModel.findByIdAndDelete(id);
}

// class-services

async function getClasses(start, calendar, userId) {
    let query = {};
    if (start) {
        query.start = start;
    }
    if (calendar) {
        query.calendar = calendar;
    }
    if (userId) {
        query.user = userId;
    }
    return await classModel.find(query);
}

async function addClass(event) {
    const eventToAdd = new classModel(event);
    return await eventToAdd.save();
}

async function editClass(classId, updatedClass) {
    return await classModel
        .findByIdAndUpdate(classId, updatedClass, { new: true })
        .exec();
}

async function findClassById(id) {
    return await classModel.findById(id);
}

async function deleteClassById(id) {
    return await classModel.findByIdAndDelete(id);
}

// todo-services

async function getTodoItems(duedate, userId) {
    let query = {};
    if (duedate) {
        query.duedate = duedate;
    }
    if (userId) {
        query.user = userId;
    }
    return await todoModel.find(query);
}

async function addTodoItem(item) {
    const itemToAdd = new todoModel(item);
    return await itemToAdd.save();
}

async function editTodoItem(itemId, updatedItem) {
    return await todoModel
        .findByIdAndUpdate(itemId, updatedItem, { new: true })
        .exec();
}

async function findTodoItemById(id) {
    return await todoModel.findById(id);
}

async function deleteTodoItemById(id) {
    return await todoModel.findByIdAndDelete(id);
}

export default {
    getUsers,
    getUserByNameAndPassword,
    addUser,
    findUserById,
    deleteUserById,
    editUser,

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
