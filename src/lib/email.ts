// lib/email.ts

import { resend } from "./resend"; // Make sure resend is properly configured and exported

export type SendEmailResult = {
  error?: string | null;
};

export async function sendOrderEmail({
  to,
  name,
  orderId,
  total,
}: {
  to: string;
  name: string;
  orderId: string;
  total: number;
}): Promise<SendEmailResult> {
  try {
    const response = await resend.emails.send({
      from: "Acme Store <onboarding@resend.dev>", // You can customize this
      to,
      subject: "Order Confirmation",
      html: `
        <h2>Thanks for your order, ${name}!</h2>
        <p>Your order ID is <strong>${orderId}</strong></p>
        <p>Total: <strong>$${total.toFixed(2)}</strong></p>
        <p>You’ll receive another email when your order ships.</p>
      `,
    });

    if (response.error) {
      return {
        error:
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error),
      };
    }

    return { error: null };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
