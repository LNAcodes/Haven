// pages/api/incidents/index.js

import Incident from "@/models/Incident";
import { withAuth } from "@/lib/api/middleware";
import { parseIncidentFields } from "@/lib/api/incidentParser";

export default withAuth(async function handler(request, response) {
  const { userId } = request;

  switch (request.method) {
    case "GET": {
      try {
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
        const { involvedPersons, witnesses, ...fields } = parseIncidentFields(
          request.body
        );

        const incident = await Incident.create({
          userId,
          involvedPersons,
          witnesses,
          ...fields,
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
});
