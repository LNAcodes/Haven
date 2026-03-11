// pages\api\incidents\index.js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET": {
      try {
        const incidents = await Incident.find();
        return response.status(200).json(incidents);
      } catch (error) {
        return response.status(500).json({ message: error.message });
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
        });

        return response.status(201).json(incident);
      } catch (error) {
        if (error.name === "ValidationError") {
          return response.status(400).json({ message: error.message });
        }
        return response.status(500).json({ message: error.message });
      }
    }
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
