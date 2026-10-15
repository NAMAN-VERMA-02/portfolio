import { useEffect, useRef, useState } from 'react';
import { useClock } from '../hooks/useClock.js';
import { Link, useRouter } from '../router.jsx';
import Menu from './Menu.jsx';
import '../styles/topbar.css';

export default function TopBar() {
  const { date, time } = useClock();
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const bar = useRef(null);

  // scroll progress line under the bar
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <>
      <header className="topbar">
        <div className="topbar__clock" aria-label={`Local time in India: ${date}, ${time}`}>
          <span>{date}</span>
          <span>
            {time} IST <i className="topbar__live" />
          </span>
        </div>
        <Link className="topbar__mark" to="/" label="Home" aria-label="Naman Verma, home">
          Naman Verma
        </Link>
        <div className="topbar__actions">
          <button
            type="button"
            className={`topbar__menu ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="topbar__menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="topbar__menu-text">{open ? 'Close' : 'Menu'}</span>
          </button>
          <Link className="btn btn--lime topbar__cta" to="/contact" label="Contact">
            Contact
          </Link>
        </div>
        <span className="topbar__progress" ref={bar} aria-hidden="true" />
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
