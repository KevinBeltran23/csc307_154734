import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 4)
          throw new Error("Invalid password, must be at least 4 characters.");
      },
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;