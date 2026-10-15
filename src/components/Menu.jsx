import { useEffect } from 'react';
import { Link, useRouter } from '../router.jsx';
import { profile } from '../data/profile.js';
import { nav } from '../data/nav.js';
import GlyphText from './GlyphText.jsx';
import '../styles/menu.css';

export default function Menu({ open, onClose }) {
  const { path } = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
      <nav className="menu__nav" aria-label="Main">
        {nav.map((item, i) => (
          <Link
            key={item.to}
            to={item.to}
            label={item.label}
            className={`menu__link ${path === item.to ? 'is-current' : ''}`}
            style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : '0s' }}
            onClick={onClose}
            data-cursor="Go"
          >
            <span className="menu__num">0{i + 1}</span>
            {open ? <GlyphText text={item.label} hover /> : item.label}
          </Link>
        ))}
      </nav>
      <div className="menu__foot">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
