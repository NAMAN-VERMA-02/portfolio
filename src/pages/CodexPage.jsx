import PageHero from '../components/PageHero.jsx';
import NextPage from '../components/NextPage.jsx';
import Marquee from '../components/Marquee.jsx';
import GlyphText from '../components/GlyphText.jsx';
import { Link } from '../router.jsx';
import { codex } from '../data/codex.js';
import '../styles/codex.css';

export default function CodexPage() {
  const [stage, team, venue] = codex.photos;

  return (
    <div className="page codex">
      <PageHero index="03 / Event" kicker={codex.when} title={codex.name} lead={codex.intro} />

      <section className="codex__facts container">
        {[
          ['Host', codex.host],
          ['Where', codex.where],
          ['When', codex.when],
          ['Track', codex.arena],
        ].map(([k, v], i) => (
          <div key={k} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="eyebrow">{k}</span>
            <p>{v}</p>
          </div>
        ))}
      </section>

      <section className="codex__gallery container">
        <figure className="codex__shot codex__shot--tall" data-reveal="wipe">
          <img src={stage.src} alt={stage.alt} loading="lazy" />
          <figcaption className="eyebrow">{stage.caption}</figcaption>
        </figure>
        <div className="codex__stack">
          <figure className="codex__shot" data-reveal="wipe">
            <img src={team.src} alt={team.alt} loading="lazy" />
            <figcaption className="eyebrow">{team.caption}</figcaption>
          </figure>
          <blockquote className="codex__quote" data-reveal>
            “Every agent has an owner. Every action has a human name on it.”
            <cite className="eyebrow">Abhed, the idea in one line</cite>
          </blockquote>
        </div>
      </section>

      <Marquee items={['Hack Arena', 'PS5', 'AI Governance', 'Human in the loop', 'PIET Panipat']} tone="lime" reverse />

      <section className="codex__days container">
        <h2 className="section-title" data-reveal>
          <GlyphText text="Three days" />
        </h2>
        <ol>
          {codex.timeline.map((d, i) => (
            <li key={d.day} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="codex__day">{d.day}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="codex__build container">
        <figure className="codex__shot codex__shot--small" data-reveal="wipe">
          <img src={venue.src} alt={venue.alt} loading="lazy" />
          <figcaption className="eyebrow">{venue.caption}</figcaption>
        </figure>
        <div data-reveal>
          <p className="eyebrow">What we built</p>
          <h2 className="codex__build-title">Abhed</h2>
          <p className="codex__build-text">
            An accountability OS for a workforce of people and AI agents: owners for every agent, approvals on your
            phone, a tamper-evident ledger and a kill switch the model can't argue with.
          </p>
          <Link to="/work/abhed" label="Abhed" className="btn btn--lime" data-cursor="View">
            See the project <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <NextPage to="/about" label="About me" />
    </div>
  );
}
