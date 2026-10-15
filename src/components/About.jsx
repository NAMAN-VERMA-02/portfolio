import { profile } from '../data/profile.js';
import { Link } from '../router.jsx';
import '../styles/about.css';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <figure className="about__photo" data-reveal="wipe">
            <img src="/images/photo4.jpg" alt="Watercolour portrait of Naman smiling in a garden" loading="lazy" />
            <figcaption className="eyebrow">Ghaziabad, India</figcaption>
          </figure>

          <div className="about__text" data-reveal>
            <p className="about__lead">
              Third-year Computer Science student at KIET, building for the web and for hackathons, one project at a
              time.
            </p>
            {profile.bio.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}

            <dl className="about__stats">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <dt className="eyebrow">{s.label}</dt>
                  <dd data-count={s.value}>{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about__actions">
              <a className="btn btn--lime" href={profile.cv} download data-cursor="PDF">
                Download CV <span className="arrow" aria-hidden="true">↓</span>
              </a>
              <Link className="btn" to="/work" label="Work">
                See my work <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
