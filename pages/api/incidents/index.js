// pages\api\incidents\index.js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;

  switch (request.method) {
    case "GET": {
      try {
        if (!session) {
          response.status(401).json({ message: "Unauthorized" });
          break;
        }
        const incidents = await Incident.find({
          userId,
          hidden: { $ne: true },
        }).sort({ date: -1 });
        response.status(200).json(incidents);
        break;
      } catch (error) {
        response.status(500).json({ message: error.message });
        break;
      }
    }
    case "POST": {
      try {
        if (!session) {
          return response.status(401).json({ message: "Unauthorized" });
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

        const incident = await Incident.create({
          userId,
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
        });

        response.status(201).json(incident);
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
    default:
      response.status(405).json({ message: "Method not allowed" });
      break;
  }
}
