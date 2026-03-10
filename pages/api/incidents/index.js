// pages\api\incidents\index.js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const incidents = await Incident.find();
      return response.status(200).json(incidents);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
