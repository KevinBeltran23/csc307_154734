import mongoose from "mongoose";

// automatically generates a unique _id field
const CalendarSchema = new mongoose.Schema(
    {
        color: {
            // string will hold the hex code for the color - we can convert that later in fronted (?)
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { collection: "calendars" }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;
