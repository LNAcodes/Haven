// models/UserSettings.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const userSettingsSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    trustedContactEmail: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserSettings =
  mongoose.models.UserSettings ||
  mongoose.model("UserSettings", userSettingsSchema);

export default UserSettings;
