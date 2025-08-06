// lib/resend.ts

import { Resend } from "resend";

// Make sure RESEND_API_KEY is defined in your .env.local
export const resend = new Resend(process.env.RESEND_API_KEY);
