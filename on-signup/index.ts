import { serve } from "https://deno.land/std/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  const { email, user_metadata } = await req.json();
  const name = user_metadata?.name || 'User';

  await resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to: [email],
    subject: 'Welcome!',
    html: `<p>Hello ${name}, welcome to our platform!</p>`,
  });

  return new Response("Email sent");
});
