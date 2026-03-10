// models/Incident.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const incidentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    involvedPersons: {
      type: [String],
      required: true,
    },
    witnesses: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["verbal", "physical", "digital", "discrimination", "other"],
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    impact: {
      type: String,
    },
    reportedTo: {
      type: String,
    },
    followUp: {
      type: String,
    },
    status: {
      type: String,
      enum: ["complete", "incomplete"],
      default: "complete",
    },
  },
  {
    timestamps: true,
  }
);

const Incident =
  mongoose.models.Incident || mongoose.model("Incident", incidentSchema);

export default Incident;
