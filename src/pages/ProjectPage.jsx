import PageHero from '../components/PageHero.jsx';
import NextPage from '../components/NextPage.jsx';
import GlyphText from '../components/GlyphText.jsx';
import { Link } from '../router.jsx';
import { projects } from '../data/projects.js';
import '../styles/project.css';

export default function ProjectPage({ project: p }) {
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <div className="page project">
      <PageHero index={`Work / ${String(i + 1).padStart(2, '0')}`} kicker={p.context} title={p.title} lead={p.tagline}>
        <dl className="project__meta" data-reveal>
          <div>
            <dt className="eyebrow">When</dt>
            <dd>{p.date}</dd>
          </div>
          <div>
            <dt className="eyebrow">Type</dt>
            <dd>{p.tag}</dd>
          </div>
          <div>
            <dt className="eyebrow">Stack</dt>
            <dd>{p.tech.join(' · ')}</dd>
          </div>
          <div className="project__actions">
            {p.repo && (
              <a className="btn" href={p.repo} target="_blank" rel="noreferrer" data-cursor="GitHub">
                Code ↗
              </a>
            )}
            {p.live && (
              <a className="btn btn--lime" href={p.live} target="_blank" rel="noreferrer" data-cursor={p.liveLabel ? 'Play' : 'Visit'}>
                {p.liveLabel || 'Live site'} ↗
              </a>
            )}
          </div>
        </dl>
      </PageHero>

      <figure className={`project__cover card-fill--${p.accent}`} data-reveal="wipe">
        {p.image ? (
          <img src={p.image} alt={`${p.title} at ${p.context}`} />
        ) : (
          <div className="project__cover-type" aria-hidden="true">
            <span>{p.title}</span>
            <code>{`{ ${p.tech.slice(0, 3).join(', ')} }`}</code>
          </div>
        )}
      </figure>

      <section className="container project__body">
        <div className="project__block" data-reveal>
          <h2 className="eyebrow">01 / The problem</h2>
          <p className="project__big">{p.problem}</p>
        </div>

        <div className="project__block" data-reveal>
          <h2 className="eyebrow">02 / What I built</h2>
          <ol className="project__list">
            {p.built.map((b, k) => (
              <li key={k} data-reveal style={{ transitionDelay: `${k * 60}ms` }}>
                <span className="project__list-num">{String(k + 1).padStart(2, '0')}</span>
                <span>{b}</span>
              </li>
            ))}
          </ol>
        </div>

        {p.gallery && (
          <div className="project__gallery">
            {p.gallery.map((g) => (
              <figure key={g.src} data-reveal="wipe">
                <img src={g.src} alt={g.caption} loading="lazy" />
                <figcaption className="eyebrow">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="project__block" data-reveal>
          <h2 className="eyebrow">03 / What I learned</h2>
          <p className="project__big">{p.learned}</p>
        </div>

        {p.slug === 'abhed' && (
          <Link to="/codex" label="CodeX 3.0" className="project__aside" data-cursor="Read" data-reveal>
            <span className="eyebrow">The event</span>
            <GlyphText text="Read the CodeX 3.0 story →" hover />
          </Link>
        )}
      </section>

      <NextPage to={`/work/${next.slug}`} label={next.title} kicker="Next project" />
    </div>
  );
}
