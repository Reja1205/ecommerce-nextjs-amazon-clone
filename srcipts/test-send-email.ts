// scripts/test-send-email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  try {
    const data = await resend.emails.send({
      from: "Your Store <noreply@yourdomain.com>",
      to: "yourgmail@gmail.com",
      subject: "Test email from Resend",
      html: "<h1>Hello from Resend!</h1>",
    });
    console.log("✅ Email sent:", data);
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
}

main();
