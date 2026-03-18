// pages/api/incidents/[id].js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;

  if (!session) {
    response.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (request.method === "GET") {
    try {
      const incident = await Incident.findById(id);

      if (!incident) {
        response.status(404).json({ message: "Incident not found" });
        return;
      }

      if (incident.userId !== userId) {
        response.status(403).json({ message: "Forbidden" });
        return;
      }

      response.status(200).json(incident);
      return;
    } catch (error) {
      response.status(500).json({ message: error.message });
      return;
    }
  }

  if (["PATCH", "PUT"].includes(request.method)) {
    try {
      const {
        involvedPersons,
        witnesses: witnessesInput,
        date,
        time,
        location,
        category,
        severity,
        description,
        impact,
        reportedTo,
        followUp,
      } = request.body;

      const involvedPersonsArray = involvedPersons
        .split(",")
        .map((person) => person.trim());

      const witnessesArray = witnessesInput
        ? witnessesInput.split(",").map((witness) => witness.trim())
        : [];

      const updated = await Incident.findByIdAndUpdate(
        id,
        {
          involvedPersons: involvedPersonsArray,
          witnesses: witnessesArray,
          date,
          time,
          location,
          category,
          severity,
          description,
          impact,
          reportedTo,
          followUp,
        },
        { new: true, runValidators: true }
      );

      if (!updated) {
        response.status(404).json({ message: "Incident not found" });
        return;
      }

      if (updated.userId !== userId) {
        response.status(403).json({ message: "Forbidden" });
        return;
      }
      response.status(200).json(updated);
      return;
    } catch (error) {
      if (error.name === "ValidationError") {
        response.status(400).json({ message: error.message });
        return;
      }
      response.status(500).json({ message: error.message });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const incident = await Incident.findById(id);

      if (!incident) {
        response.status(404).json({ message: "Incident not found" });
        return;
      }

      if (incident.userId !== userId) {
        response.status(403).json({ message: "Forbidden" });
        return;
      }

      await Incident.findByIdAndDelete(id);
      response.status(200).json({ message: "Incident deleted" });
      return;
    } catch (error) {
      response.status(500).json({ message: error.message });
      return;
    }
  }
}
