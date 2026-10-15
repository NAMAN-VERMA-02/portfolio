import { useState } from 'react';
import { projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import '../styles/projects.css';

const filters = ['All', ...new Set(projects.map((p) => p.tag))];

export default function Projects() {
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2 className="section-title">Projects</h2>
          <span className="eyebrow">02 / What I've built</span>
        </div>

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
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {shown.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={projects.indexOf(p) + 1} wide={i === 0 && active === 'All'} />
          ))}
        </div>
      </div>
    </section>
  );
}
