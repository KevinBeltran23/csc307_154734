import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
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
        location: {
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
    { collection: "events" }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;
