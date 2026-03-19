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

  switch (request.method) {
    case "GET": {
      try {
        const incident = await Incident.findById(id);

        if (!incident) {
          response.status(404).json({ message: "Incident not found" });
          break;
        }

        if (incident.userId !== userId) {
          response.status(403).json({ message: "Forbidden" });
          break;
        }

        response.status(200).json(incident);
        break;
      } catch (error) {
        response.status(500).json({ message: error.message });
        break;
      }
    }

    case "PATCH":
    case "PUT": {
      try {
        const incident = await Incident.findById(id);

        if (!incident) {
          response.status(404).json({ message: "Incident not found" });
          break;
        }

        if (incident.userId !== userId) {
          response.status(403).json({ message: "Forbidden" });
          break;
        }
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

        response.status(200).json(updated);
        break;
      } catch (error) {
        if (error.name === "ValidationError") {
          response.status(400).json({ message: error.message });
          break;
        }
        response.status(500).json({ message: error.message });
        break;
      }
    }

    case "DELETE": {
      try {
        const incident = await Incident.findById(id);

        if (!incident) {
          response.status(404).json({ message: "Incident not found" });
          break;
        }

        if (incident.userId !== userId) {
          response.status(403).json({ message: "Forbidden" });
          break;
        }

        await Incident.findByIdAndDelete(id);
        response.status(200).json({ message: "Incident deleted" });
        break;
      } catch (error) {
        response.status(500).json({ message: error.message });
        break;
      }
    }

    default:
      response.status(405).json({ message: "Method not allowed" });
      break;
  }
}
