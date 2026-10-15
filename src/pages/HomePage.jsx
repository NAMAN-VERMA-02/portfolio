import Hero from '../components/Hero.jsx';
import GlyphText from '../components/GlyphText.jsx';
import Marquee from '../components/Marquee.jsx';
import WorkList from '../components/WorkList.jsx';
import { Link } from '../router.jsx';
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { codex } from '../data/codex.js';
import '../styles/home.css';

const stack = ['React', 'TypeScript', 'Three.js', 'JavaScript', 'C++', 'Java', 'Next.js', 'Python', 'Docker', 'Git', 'DSA'];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="intro">
        <div className="container">
          <p className="eyebrow" data-reveal>
            <GlyphText text="// hello, world" />
          </p>
          <p className="intro__statement" data-reveal>
            I'm <em>Naman</em>, a Computer Science student at KIET who likes taking ideas from a blank page to something
            people can actually use: web apps, a 3D board game, hackathon builds and tools for AI agents.
          </p>
          <dl className="intro__stats">
            {profile.stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <dd data-count={s.value}>{s.value}</dd>
                <dt className="eyebrow">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Marquee items={stack} tone="night" />

      <section className="section home-work">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2 className="section-title">
              <GlyphText text="Selected work" />
            </h2>
            <Link to="/work" label="Work" className="btn">
              All projects <span className="arrow">→</span>
            </Link>
          </div>
          <WorkList items={projects.filter((p) => p.featured)} />
        </div>
      </section>

      <section className="home-codex">
        <div className="container home-codex__grid">
          <figure className="home-codex__photo" data-reveal="wipe">
            <img src="/images/codex-stage.jpg" alt="Naman on the CodeX 3.0 stage at PIET Panipat" loading="lazy" />
          </figure>
          <div className="home-codex__text">
            <p className="eyebrow" data-reveal>
              Latest · {codex.when}
            </p>
            <h2 className="home-codex__title" data-reveal>
              <GlyphText text="CodeX 3.0" />
            </h2>
            <p className="home-codex__lead" data-reveal>
              Three days at PIET Panipat building Abhed, an accountability OS for AI agents.
            </p>
            <Link to="/codex" label="CodeX 3.0" className="btn btn--lime" data-cursor="Read" data-reveal>
              Read the story <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Link to="/contact" label="Contact" className="home-cta" data-cursor="Say hi">
        <div className="container">
          <span className="eyebrow">Open to internships · 2026 – 27</span>
          <span className="home-cta__title">
            Let's build <em>something</em> <span className="arrow">→</span>
          </span>
        </div>
      </Link>
    </>
  );
}
