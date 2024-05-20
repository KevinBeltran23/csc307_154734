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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { collection: "todos" }
);

const ToDo = mongoose.model("ToDo", ToDoSchema);

export default ToDo;
