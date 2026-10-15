import { journey } from '../data/journey.js';
import '../styles/journey.css';

export default function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="container">
        <div className="journey__grid">
          <ol className="journey__list">
            {journey.map((j) => (
              <li key={j.title} className="journey__item" data-reveal>
                <span className="journey__when">{j.when}</span>
                <div>
                  <h3 className="journey__title">{j.title}</h3>
                  <p className="journey__place eyebrow">{j.place}</p>
                  {j.text && <p className="journey__text">{j.text}</p>}
                </div>
              </li>
            ))}
          </ol>

          <figure className="journey__photo" data-reveal="wipe">
            <img src="/images/photo3.jpg" alt="Naman on a street in Delhi NCR wearing an event lanyard" loading="lazy" />
            <figcaption className="eyebrow">On the way to a hackathon · Delhi NCR</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
