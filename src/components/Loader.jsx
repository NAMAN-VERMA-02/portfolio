import { useEffect, useState } from 'react';
import '../styles/loader.css';

// Intro: a counter runs 000 → 100 while the name decodes, then the screen lifts.
// Shown once per browser tab.
export default function Loader() {
  const [show] = useState(() => {
    try {
      if (sessionStorage.getItem('nv-intro')) return false;
      sessionStorage.setItem('nv-intro', '1');
    } catch {
      /* storage blocked: still fine to show once */
    }
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [n, setN] = useState(0);
  const [done, setDone] = useState(!show);
  const [gone, setGone] = useState(!show);

  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    const dur = 1300;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 150);
        setTimeout(() => setGone(true), 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  if (gone) return null;
  return (
    <div className={`loader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="loader__top">
        <span>Portfolio · 2026</span>
        <span>B.Tech CS · KIET</span>
      </div>
      <p className="loader__name">
        {'NAMAN VERMA'.split('').map((c, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </p>
      <div className="loader__bottom">
        <span className="loader__count">{String(n).padStart(3, '0')}</span>
        <span className="loader__bar">
          <i style={{ transform: `scaleX(${n / 100})` }} />
        </span>
      </div>
    </div>
  );
}
