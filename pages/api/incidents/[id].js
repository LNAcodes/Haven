// pages/api/incidents/[id].js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const incident = await Incident.findById(id);

      if (!incident) {
        response.status(404).json({ message: "Incident not found" });
        return;
      }

      response.status(200).json(incident);
      return;
    } catch (error) {
      response.status(500).json({ message: error.message });
      return;
    }
  }
}
