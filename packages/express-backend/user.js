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
            trim: true,
            validate(value) {
                if (value.length < 4)
                    throw new Error(
                        "Invalid password, must be at least 4 characters."
                    );
            }
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
            type: String,
            required: true,
            trim: true
        },
        secret_setting2: {
            type: String,
            required: true,
            trim: true
        }
    },
    { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

// mongoose.connect('mongodb+srv://Karen:karen@154754.qdl82np.mongodb.net/', {dbName: 'User'});

export default User;
