import { Link } from '../router.jsx';

export default function ProjectCard({ project, index, wide, order = 0 }) {
  const { slug, title, tagline, description, tech, tag, repo, live, accent, date } = project;
  const num = String(index).padStart(2, '0');

  return (
    <article
      className={`card card--${accent} ${wide ? 'card--wide' : ''}`}
      style={{ animationDelay: `${order * 70}ms` }}
    >
      <div className="card__top">
        <span className="card__num">{num}</span>
        <span className="card__tag">
          {tag} · {date}
        </span>
      </div>

      <h3 className="card__title">
        <Link to={`/work/${slug}`} label={title} className="card__link" data-cursor="View">
          {title}
        </Link>
      </h3>
      <p className="card__tagline">{tagline}</p>
      <p className="card__desc">{description}</p>

      <ul className="card__tech" aria-label="Tech used">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="card__links">
        <span className="card__more">
          Case study <span className="arrow">→</span>
        </span>
        {repo && (
          <a href={repo} target="_blank" rel="noreferrer">
            Code <span className="arrow" aria-hidden="true">↗</span>
          </a>
        )}
        {live && (
          <a href={live} target="_blank" rel="noreferrer">
            Live site <span className="arrow" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
