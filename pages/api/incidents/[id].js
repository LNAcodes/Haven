// pages/api/incidents/[id].js

import Incident from "@/models/Incident";
import { withAuth } from "@/lib/api/middleware";
import { parseIncidentFields } from "@/lib/api/incidentParser";

export default withAuth(async function handler(request, response) {
  const { id } = request.query;
  const { userId } = request;

  switch (request.method) {
    case "GET": {
      try {
        const incident = await Incident.findOne({
          _id: id,
          hidden: { $ne: true },
        });

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
        const incident = await Incident.findOne({
          _id: id,
          hidden: { $ne: true },
        });

        if (!incident) {
          response.status(404).json({ message: "Incident not found" });
          break;
        }

        if (incident.userId !== userId) {
          response.status(403).json({ message: "Forbidden" });
          break;
        }

        const { involvedPersons, witnesses, ...fields } =
          parseIncidentFields(request.body);

        const updated = await Incident.findByIdAndUpdate(
          id,
          { involvedPersons, witnesses, ...fields },
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
        const incident = await Incident.findOne({
          _id: id,
          hidden: { $ne: true },
        });

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
});
