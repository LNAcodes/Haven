// models/Incident.js

import mongoose from "mongoose";
import {
  INCIDENT_CATEGORIES,
  SEVERITY_LEVELS,
} from "@/lib/constants/incident";

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
      enum: INCIDENT_CATEGORIES,
      required: true,
    },
    severity: {
      type: String,
      enum: SEVERITY_LEVELS,
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
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Incident =
  mongoose.models.Incident || mongoose.model("Incident", incidentSchema);

export default Incident;
