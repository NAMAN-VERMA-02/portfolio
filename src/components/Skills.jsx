import { skills, softSkills } from '../data/skills.js';
import '../styles/skills.css';

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2 className="section-title">Skills</h2>
          <span className="eyebrow">03 / What I work with</span>
        </div>

        <div className="skills__grid">
          {skills.map((s, i) => (
            <div className="skills__col" key={s.group} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <h3 className="skills__group">{s.group}</h3>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="skills__marquee" aria-label="Soft skills">
          <div className="skills__track">
            {[...softSkills, ...softSkills].map((s, i) => (
              <span key={i} aria-hidden={i >= softSkills.length}>
                {s} <em>✦</em>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
