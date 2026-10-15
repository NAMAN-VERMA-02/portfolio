import { profile } from '../data/profile.js';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__mark">{profile.name}</p>
        <p className="footer__motto">Learn · Build · Grow</p>
        <p className="footer__small">
          © {new Date().getFullYear()} · Built with React &amp; plain CSS ·{' '}
          <a href="#top">Back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
