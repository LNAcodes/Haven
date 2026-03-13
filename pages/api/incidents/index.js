// pages\api\incidents\index.js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET": {
      try {
        const incidents = await Incident.find().sort({ date: -1 });
        response.status(200).json(incidents);
        break;
      } catch (error) {
        response.status(500).json({ message: error.message });
        break;
      }
    }
    case "POST": {
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

        const incident = await Incident.create({
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
