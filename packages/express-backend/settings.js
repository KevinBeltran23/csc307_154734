import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
    {
        language: {
            type: String,
            required: true,
            trim: true
        },
        bold: {
            type: Date,
            required: true,
            trim: true
        },
        large: {
            type: Date,
            required: true,
            trim: true
        },
        default_view: {
            type: String,
            trim: true
        },
        polytime: {
            type: String,
            ref: "Calendar"
        },
        secret_setting1: {
            type: String,
            trim: true
        },
        secret_setting2: {
            type: String,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { collection: "settings_list" }
);

const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;
