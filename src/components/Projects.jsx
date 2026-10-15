import { useState } from 'react';
import { projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import '../styles/projects.css';

const filters = ['All', ...new Set(projects.map((p) => p.tag))];

export default function Projects() {
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <section className="projects">
      <div className="container">
        <div className="projects__filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`projects__filter ${active === f ? 'is-active' : ''}`}
              aria-pressed={active === f}
              onClick={() => setActive(f)}
            >
              {f}
              <sup>{f === 'All' ? projects.length : projects.filter((p) => p.tag === f).length}</sup>
            </button>
          ))}
        </div>

        <div className="projects__grid" key={active}>
          {shown.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={projects.indexOf(p) + 1}
              wide={i === 0 && active === 'All'}
              order={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
