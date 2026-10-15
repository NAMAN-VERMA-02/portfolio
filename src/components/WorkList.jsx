import { useRef, useState } from 'react';
import { Link } from '../router.jsx';
import GlyphText from './GlyphText.jsx';
import '../styles/worklist.css';

// Editorial list of projects. On hover a colour preview card follows the cursor.
export default function WorkList({ items }) {
  const preview = useRef(null);
  const [active, setActive] = useState(null);

  const move = (e) => {
    if (!preview.current) return;
    preview.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <div className="worklist" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      {items.map((p, i) => (
        <Link
          key={p.slug}
          to={`/work/${p.slug}`}
          label={p.title}
          className="worklist__row"
          data-cursor="View"
          onMouseEnter={() => setActive(p)}
        >
          <span className="worklist__num">{String(i + 1).padStart(2, '0')}</span>
          <GlyphText className="worklist__title" text={p.title} hover />
          <span className="worklist__tag">{p.tag}</span>
          <span className="worklist__date">{p.date}</span>
        </Link>
      ))}

      <div ref={preview} className={`worklist__preview ${active ? 'is-on' : ''}`} aria-hidden="true">
        <div className={`worklist__card card-fill--${active?.accent || 'ink'}`}>
          {active?.image ? <img src={active.image} alt="" /> : <span>{active?.title}</span>}
          <p>{active?.tagline}</p>
        </div>
      </div>
    </div>
  );
}
