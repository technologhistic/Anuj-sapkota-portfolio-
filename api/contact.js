const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 4;
const MAX_BODY_BYTES = 12_000;
const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || 'anujminer@gmail.com';

const rateStore = globalThis.__portfolioContactRateStore || new Map();
globalThis.__portfolioContactRateStore = rateStore;

const sendJson = (response, status, body) => response.status(status).json(body);

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  const forwardedHost = request.headers['x-forwarded-host'];
  const requestHost = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || request.headers.host || '').split(',')[0].trim();
  try {
    return Boolean(requestHost) && new URL(origin).host === requestHost;
  } catch {
    return false;
  }
}

function isRateLimited(request) {
  const forwarded = request.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || request.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const recent = (rateStore.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  rateStore.set(ip, recent);
  return false;
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { message: 'Use POST to send a message.' });
  }

  const declaredLength = Number(request.headers['content-length'] || 0);
  if (declaredLength > MAX_BODY_BYTES) return sendJson(response, 413, { message: 'Your message is too large. Please shorten it and try again.' });
  if (!hasSameOrigin(request)) return sendJson(response, 403, { message: 'This request could not be verified.' });

  let body = request.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return sendJson(response, 400, { message: 'Please complete all fields and try again.' });
  }

  // Quietly accept automated honeypot submissions without sending mail.
  if (cleanText(body.website, 200)) return sendJson(response, 200, { message: 'Thanks — your message has been sent.' });

  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 254);
  const subject = cleanText(body.subject, 140).replace(/[\r\n]+/g, ' ');
  const message = cleanText(body.message, 5000);
  if (!name || !isValidEmail(email) || !subject || message.length < 10) {
    return sendJson(response, 400, { message: 'Please check your name, email, subject, and message.' });
  }
  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
    return sendJson(response, 413, { message: 'Your message is too large. Please shorten it and try again.' });
  }
  if (isRateLimited(request)) return sendJson(response, 429, { message: 'Too many messages were sent from this connection. Please try again in a minute.' });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return sendJson(response, 503, { message: 'The contact form is not configured yet. Please email anujminer@gmail.com directly.' });
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        text: `New portfolio message\n\nFrom: ${name}\nReply to: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!emailResponse.ok) {
      console.error('Portfolio contact email provider returned status', emailResponse.status);
      return sendJson(response, 502, { message: 'The email service could not send your message. Please email me directly.' });
    }
    return sendJson(response, 200, { message: 'Thanks — your message has been sent.' });
  } catch (error) {
    console.error('Portfolio contact email request failed:', error instanceof Error ? error.message : 'unknown error');
    return sendJson(response, 502, { message: 'The email service could not be reached. Please email me directly.' });
  }
}
