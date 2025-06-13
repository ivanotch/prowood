import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export async function sendVerificationEmail(email: string, code: string) {
  await resend.emails.send({
    from: "Your App <onboarding@resend.dev>",
    to: "babidaivan09@gmail.com",
    subject: "Your Verification Code",
    html: `<p>Your verification code is <strong>${code}</strong></p>`,
  });
}