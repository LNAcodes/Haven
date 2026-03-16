// pages/api/incidents/[id].js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const incident = await Incident.findOne({ _id: id });

      if (!incident) {
        response.status(404).json({ message: "Incident not found" });
        return;
      }
      response.status(200).json(incidentCard);
      return;
    } catch (error) {
      response.status(500).json({ message: error.message });
      return;
    }
  }
}
