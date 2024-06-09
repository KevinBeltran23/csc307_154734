// imports
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userModel from "./user.js";
import eventModel from "./event.js";
import todoModel from "./todo-item.js";
import classModel from "./class.js";
import calendarModel from "./calendar.js";
import config from "./config.js";

mongoose.set("debug", true);

// connecting to database: checking to make sure it connects properly
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.env.MONGO, {
            //must add in order to not get any error messages:
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`mongo database is connected!!! ${conn.connection.host} `);
    } catch (error) {
        console.error(`Error: ${error} `);
    }
};

// user-servicess

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
    return await userModel.findByIdAndUpdate(userId, updatedUser, {
        new: true
    });
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
    return await eventModel.findByIdAndUpdate(eventId, updatedEvent, {
        new: true
    });
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
    return await calendarModel.findByIdAndUpdate(calendarId, updatedCalendar, {
        new: true
    });
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
    return await classModel.findByIdAndUpdate(classId, updatedClass, {
        new: true
    });
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
    return await todoModel.findByIdAndUpdate(itemId, updatedItem, {
        new: true
    });
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
    editTodoItem,

    connectDB
};
