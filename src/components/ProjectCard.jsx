export default function ProjectCard({ project, index, wide }) {
  const { title, tagline, description, tech, tag, repo, live, accent } = project;
  const num = String(index).padStart(2, '0');

  return (
    <article className={`card card--${accent} ${wide ? 'card--wide' : ''}`}>
      <div className="card__top">
        <span className="card__num">{num}</span>
        <span className="card__tag">{tag}</span>
      </div>

      <h3 className="card__title">{title}</h3>
      <p className="card__tagline">{tagline}</p>
      <p className="card__desc">{description}</p>

      <ul className="card__tech" aria-label="Tech used">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="card__links">
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
        {!repo && !live && <span className="card__private">Team project · code private</span>}
      </div>
    </article>
  );
}
