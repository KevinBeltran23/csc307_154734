import mongoose from "mongoose";
import userModel from "./user.js";
import eventModel from "./event.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://Karen:karen@154754.qdl82np.mongodb.net/?retryWrites=true&w=majority&appName=154754", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

  // new functions

  function getUsers(name, password) {
    let query = {};
    if (name && password) {
      query = { name: name, password: password };
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

export default {
  addUser,
  addEvent,
  getUsers,
  getUserByNameAndPassword
};