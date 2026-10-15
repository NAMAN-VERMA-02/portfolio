import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile.js';
import Tile from './Tile.jsx';
import '../styles/hero.css';

// Order matches the 3×2 grid, left to right, top to bottom.
// `at` is how far through the scroll (0–1) the tile fills with its colour.
const tiles = [
  { label: 'About', href: '#about', fill: 'night', at: 0.3 },
  { label: 'Projects', href: '#projects', fill: 'magenta', at: 0.15 },
  { label: 'Skills', href: '#skills', fill: 'night', at: 0.45 },
  { headline: true, fill: 'lime', at: 0.6 },
  { label: 'Journey', href: '#journey', fill: 'night', at: 0.35 },
  { label: 'Contact', href: '#contact', fill: 'pink', at: 0.5 },
];

export default function Hero() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const bar = el.getBoundingClientRect().top + window.scrollY; // height of the fixed top bar
      const scrollable = el.offsetHeight - (window.innerHeight - bar);
      const p = scrollable > 0 ? (bar - el.getBoundingClientRect().top) / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={ref} aria-label="Introduction">
      <div className="hero__sticky">
        <img
          className="hero__photo"
          src="/images/photo2.jpg"
          alt="Naman Verma in a black suit, arms crossed, under a blue sky"
          style={{ transform: `scale(${1 + progress * 0.06})` }}
        />
        <div className="hero__shade" style={{ opacity: progress * 0.75 }} />

        <div className="hero__grid">
          {tiles.map((t, i) =>
            t.headline ? (
              <div key={i} className={`tile tile--headline tile--${t.fill} ${progress >= t.at ? 'is-filled' : ''}`}>
                <h1 className="hero__title">
                  {profile.headline.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
              </div>
            ) : (
              <Tile key={t.label} {...t} filled={progress >= t.at} />
            )
          )}
        </div>

        <p className="hero__meta">
          {profile.degree} · {profile.section} · Class of {profile.graduation}
        </p>
      </div>
    </section>
  );
}
