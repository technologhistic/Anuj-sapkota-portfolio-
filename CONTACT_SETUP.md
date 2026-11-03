# Contact form setup

The portfolio sends contact form submissions through the Vercel Function at `/api/contact` and the Resend Email API. The browser never receives the Resend API key.

## Configure local development

1. Create a Resend account and verify a domain you control for sending.
2. Create a sending-only API key in Resend.
3. Copy `.env.example` to `.env` and set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
4. Set `CONTACT_FROM_EMAIL` to an address on the verified domain. The recipient defaults to `anujminer@gmail.com`.
5. Run `npm run dev`. The local Express server serves Vite and the same `/api/contact` handler.

## Configure Vercel

Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` under the Vercel project's Environment Variables, then redeploy. Do not commit `.env` or put the Resend key in a `VITE_` variable.

Without these server-side values, the endpoint returns `503` and the page offers the direct email link. It does not report a message as sent.
