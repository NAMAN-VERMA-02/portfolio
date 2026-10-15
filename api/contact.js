// Vercel serverless function: POST /api/contact
// Sends the contact form to my inbox through Resend (https://resend.com).
// Needs the RESEND_API_KEY environment variable set in Vercel.

const TO = process.env.CONTACT_TO || 'naman.2428cs1673@kiet.edu';
const FROM = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  // Honeypot filled in: pretend it worked so bots move on.
  if (body.company) return res.status(200).json({ ok: true });

  if (!name || name.length > 100) return res.status(400).json({ error: 'Please enter your name.' });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return res.status(400).json({ error: 'Please enter a valid email.' });
  if (message.length < 5 || message.length > 5000)
    return res.status(400).json({ error: 'Please write a message (5 to 5000 characters).' });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: 'The contact form is not set up yet.' });

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'The message could not be sent right now.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'The message could not be sent right now.' });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
