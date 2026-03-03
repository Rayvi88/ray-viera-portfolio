import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const phoneRow = phone
      ? `<tr><td style="padding:6px 0;color:#9CA3AF;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>`
      : "";

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FFFCF6;border:1px solid #E8E4DC;border-radius:12px;">
        <h2 style="color:#00C3D0;margin-bottom:4px;">New message from your portfolio</h2>
        <p style="color:#9CA3AF;font-size:14px;margin-top:0;">Someone reached out through your contact form.</p>
        <hr style="border:none;border-top:1px solid #E8E4DC;margin:24px 0;" />
        <table style="width:100%;font-size:14px;color:#374151;">
          <tr>
            <td style="padding:6px 0;color:#9CA3AF;width:140px;">Name</td>
            <td style="padding:6px 0;font-weight:600;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#9CA3AF;">Email</td>
            <td style="padding:6px 0;"><a href="mailto:${email}" style="color:#00C3D0;">${email}</a></td>
          </tr>
          ${phoneRow}
          <tr>
            <td style="padding:6px 0;color:#9CA3AF;">Subject</td>
            <td style="padding:6px 0;">${subject}</td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #E8E4DC;margin:24px 0;" />
        <p style="color:#9CA3AF;font-size:12px;margin-bottom:8px;">Message</p>
        <p style="color:#1a1a1a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
        <hr style="border:none;border-top:1px solid #E8E4DC;margin:24px 0;" />
        <p style="color:#C4BDB5;font-size:12px;text-align:center;">Ray Viera Portfolio</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "raymvier@gmail.com",
      replyTo: email,
      subject: "[Portfolio] " + subject,
      html,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ success: true, data });

  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}