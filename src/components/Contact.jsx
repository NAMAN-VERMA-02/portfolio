import { useState } from 'react';
import { profile } from '../data/profile.js';
import GlyphText from './GlyphText.jsx';
import '../styles/contact.css';

const empty = { name: '', email: '', message: '', company: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Hello from ${form.name || 'your portfolio'}`
  )}&body=${encodeURIComponent(form.message)}`;

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'The message could not be sent.');
      setStatus('sent');
      setForm(empty);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__head" data-reveal>
          <span className="eyebrow">06 / Contact</span>
          <h1 className="contact__title">
            <GlyphText text="Let's build" speed={24} />
            <br />
            <GlyphText text="something" speed={24} delay={200} />
          </h1>
        </div>

        <div className="contact__grid">
          <div className="contact__info" data-reveal>
            <div className="contact__avatar-wrap">
              <img className="contact__avatar" src="/images/photo1.jpg" alt="Naman in a white shirt outside a glass building" loading="lazy" />
            </div>
            <p className="contact__note">
              Open to internships and entry-level software roles. The fastest way to reach me is email.
            </p>
            <ul className="contact__links">
              <li>
                <a href={`mailto:${profile.email}`}>
                  <span className="eyebrow">Email</span>
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <span className="eyebrow">LinkedIn</span>
                  naman-verma <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <span className="eyebrow">GitHub</span>
                  NAMAN-VERMA-02 <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.github2} target="_blank" rel="noreferrer">
                  <span className="eyebrow">GitHub 2</span>
                  eNVy-rights <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.cv} download>
                  <span className="eyebrow">CV</span>
                  Download PDF <span className="arrow">↓</span>
                </a>
              </li>
            </ul>
          </div>

          <form className="contact__form" onSubmit={submit} data-reveal noValidate={false}>
            <label>
              <span className="eyebrow">Your name</span>
              <input name="name" value={form.name} onChange={update} required maxLength={100} autoComplete="name" />
            </label>
            <label>
              <span className="eyebrow">Your email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
                maxLength={200}
                autoComplete="email"
              />
            </label>
            <label>
              <span className="eyebrow">Message</span>
              <textarea name="message" value={form.message} onChange={update} required rows={5} maxLength={5000} />
            </label>
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <label className="contact__hp" aria-hidden="true">
              Company
              <input name="company" value={form.company} onChange={update} tabIndex={-1} autoComplete="off" />
            </label>

            <button className="btn btn--lime contact__send" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <span className="arrow">→</span>
            </button>

            <div className="contact__status" role="status" aria-live="polite">
              {status === 'sent' && <p className="is-ok">Thanks! Your message reached my inbox. I'll reply soon.</p>}
              {status === 'error' && (
                <p className="is-err">
                  {error} You can{' '}
                  <a href={mailto}>email me directly instead</a>.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
