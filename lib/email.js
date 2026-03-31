// lib/email.js

import nodemailer from "nodemailer";

export async function sendPanicEmail({ toEmail, incidents }) {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    return { sent: false, reason: "Email not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const json = JSON.stringify(incidents, null, 2);
  const count = incidents.length;
  const dateStr = new Date().toLocaleString("en-GB");

  await transporter.sendMail({
    from: EMAIL_USER,
    to: toEmail,
    subject: `Haven — Emergency export (${dateStr})`,
    text: [
      "This is an automated emergency export from the Haven app.",
      "",
      `Exported at: ${dateStr}`,
      `Records: ${count}`,
      "",
      "The sender has activated their emergency exit. All records have been",
      "deleted from the app. The full export is attached as JSON.",
      "",
      "If you received this unexpectedly, please check on this person.",
    ].join("\n"),
    attachments: [
      {
        filename: `haven-export-${Date.now()}.json`,
        content: json,
        contentType: "application/json",
      },
    ],
  });

  return { sent: true };
}
