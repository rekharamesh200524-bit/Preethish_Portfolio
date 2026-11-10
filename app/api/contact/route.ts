import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const DEFAULT_PORTFOLIO_EMAIL = "preethish94@gmail.com";

const TOPIC_LABELS: Record<string, string> = {
  "graphic-design": "Graphic Design & Brand Collateral",
  "video-editing": "Post-Production Video Editing / Color Grading",
  "digital-marketing": "Digital Marketing, SEO & Google Ads",
  employment: "Full-time / Strategic Employment Opportunity",
  other: "General Creative Dialogue",
};

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHeaderBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const fullName = typeof record.fullName === "string" ? stripHeaderBreaks(record.fullName) : "";
  const email = typeof record.email === "string" ? stripHeaderBreaks(record.email) : "";
  const subject = typeof record.subject === "string" ? stripHeaderBreaks(record.subject) : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";

  if (!fullName || fullName.length > 120) {
    return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
  }
  if (!email || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!subject) {
    return NextResponse.json({ error: "Please select an inquiry topic." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Message must be between 10 and 5000 characters." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER?.trim() || DEFAULT_PORTFOLIO_EMAIL;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "") || "";
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_PORTFOLIO_EMAIL;

  if (!gmailAppPassword) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Add GMAIL_APP_PASSWORD to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  const topicLabel = TOPIC_LABELS[subject] ?? subject;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: `"${fullName.replace(/"/g, "")}" <${email}>`,
      subject: `[Portfolio Inquiry] ${topicLabel} — ${fullName}`,
      text: [
        `New message from your portfolio contact form`,
        ``,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Topic: ${topicLabel}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0e1015; color: #f3f4f6; padding: 28px; border: 1px solid #27272a;">
          <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #e11d48; margin: 0 0 12px;">
            Portfolio Contact Transmission
          </p>
          <h2 style="margin: 0 0 20px; font-size: 20px; color: #ffffff;">
            ${escapeHtml(topicLabel)}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; width: 90px;">From:</td>
              <td style="padding: 8px 0; color: #ffffff;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #e11d48;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Topic:</td>
              <td style="padding: 8px 0; color: #ffffff;">${escapeHtml(topicLabel)}</td>
            </tr>
          </table>
          <div style="padding: 16px; background: #07080a; border: 1px solid #27272a; white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: #e4e4e7;">${escapeHtml(message)}</div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again or email directly." },
      { status: 500 }
    );
  }
}

