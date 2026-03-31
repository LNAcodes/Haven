// pages/api/user/settings.js

import dbConnect from "@/db/connect";
import UserSettings from "@/models/UserSettings";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await dbConnect();

  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const userId = token.sub;

  switch (req.method) {
    case "GET": {
      try {
        const settings = await UserSettings.findOne({ userId });
        return res.status(200).json({
          trustedContactEmail: settings?.trustedContactEmail ?? "",
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    case "PUT": {
      try {
        const { trustedContactEmail } = req.body;
        const settings = await UserSettings.findOneAndUpdate(
          { userId },
          { trustedContactEmail: trustedContactEmail ?? "" },
          { upsert: true, new: true }
        );
        return res.status(200).json({
          trustedContactEmail: settings.trustedContactEmail,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
