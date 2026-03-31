// pages/api/panic.js

import dbConnect from "@/db/connect";
import Incident from "@/models/Incident";
import UserSettings from "@/models/UserSettings";
import { getToken } from "next-auth/jwt";
import { sendPanicEmail } from "@/lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const userId = token.sub;

  try {
    // Step 1: soft-delete immediately so the app appears empty right away
    await Incident.updateMany({ userId }, { hidden: true });

    // Step 2: attempt email if a trusted contact is configured
    const settings = await UserSettings.findOne({ userId });
    const trustedContactEmail = settings?.trustedContactEmail;

    if (trustedContactEmail) {
      const incidents = await Incident.find({ userId, hidden: true }).lean();
      const emailResult = await sendPanicEmail({
        toEmail: trustedContactEmail,
        incidents,
      }).catch(() => ({ sent: false }));

      // Step 3: permanently delete only once email is confirmed sent
      if (emailResult.sent) {
        await Incident.deleteMany({ userId });
      }
      // If email failed, records stay hidden in DB until a future retry or
      // manual admin recovery — the app still looks empty to the user.
    } else {
      // No trusted contact — permanently delete straight away
      await Incident.deleteMany({ userId });
    }

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
