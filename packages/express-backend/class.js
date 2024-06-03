import mongoose from "mongoose";

// automatically generates a unique _id field
const ClassSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        start: {
            type: Date,
            required: true,
            trim: true
        },
        end: {
            type: Date,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        professor: {
            type: String,
            trim: true
        },
        calendar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calendar"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { collection: "classes" }
);

const Class = mongoose.model("Class", ClassSchema);

export default Class;
