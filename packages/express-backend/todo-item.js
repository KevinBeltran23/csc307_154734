import mongoose from "mongoose";

// automatically generates a unique _id field
const ToDoSchema = new mongoose.Schema(
    {
        duedate: {
            type: Date,
            required: false,
            trim: true
        },
        contents: {
            type: String,
            required: true,
            trim: true
        },
        checked: {
            type: Boolean,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { collection: "todos" }
);

const ToDo = mongoose.model("ToDo", ToDoSchema);

export default ToDo;
