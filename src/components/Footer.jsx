import { profile } from '../data/profile.js';
import { nav } from '../data/nav.js';
import { Link } from '../router.jsx';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <nav className="footer__nav" aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} label={n.label}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="footer__social">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
        <p className="footer__mark">{profile.name}</p>
        <p className="footer__small">
          <span>© {new Date().getFullYear()} · Learn · Build · Grow</span>
          <span>Built with React &amp; plain CSS</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </p>
      </div>
    </footer>
  );
}
