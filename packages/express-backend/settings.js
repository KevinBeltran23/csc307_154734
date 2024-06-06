import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
    {
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
            trim: true
        },
        polytime: {
            type: Boolean,
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
    { collection: "settings" }
);

const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;
