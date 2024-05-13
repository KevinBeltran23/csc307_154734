import mongoose from "mongoose";
import userModel from "./user.js";
import eventModel from "./event.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

  // new functions

  function getUsers(name, password) {
    let query = {};
    if (name && password) {
      query = { name: name, password: password };
    } else if (name) {
      query = { name: name };
    } else if (password) {
      query = { password: password };
    }
    return userModel.find(query);
  }  

  function getUserByNameAndPassword(name, password) {
    return userModel.findOne({ name: name, password: password });
  }

  function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
  }

  function addEvent(event) {
    const eventToAdd = new eventModel (event);
    const promise = eventToAdd.save();
    return promise
  }

  /* old functions

  function getUsers(name, job) {
    let query = {};
    if (name && job) {
      query = { name: name, job: job };
    } else if (name) {
      query = { name: name };
    } else if (job) {
      query = { job: job };
    }
    return userModel.find(query);
  }  

  function findUserById(id) {
    return userModel.findById(id);
  }

  function findUserByName(name) {
    return userModel.find({ name: name });
  }

  function findUserByJob(job) {
    return userModel.find({ job: job });
  }

  function deleteUserById(id) {
      return userModel.findByIdAndDelete(id);
  }*/


export default {
  addUser,
  addEvent,
  getUsers,
  getUserByNameAndPassword
};