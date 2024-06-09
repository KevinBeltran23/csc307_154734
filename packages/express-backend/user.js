import mongoose from "mongoose";

// automatically generates a unique _id field
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        language: {
            type: String,
            required: true,
            trim: true
        },
        bold: {
            type: Boolean,
            required: true,
            trim: true
        },
        default_view: {
            type: String,
            required: true,
            trim: true
        },
        polytime: {
            type: Boolean,
            required: true,
            ref: "Calendar"
        },
        secret_setting1: {
            type: Boolean,
            required: true,
            trim: true
        },
        secret_setting2: {
            type: Boolean,
            required: true,
            trim: true
        }
    },
    { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

// mongoose.connect('mongodb+srv://Karen:karen@154754.qdl82np.mongodb.net/', {dbName: 'User'});

export default User;
