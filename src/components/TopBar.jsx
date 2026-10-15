import { useClock } from '../hooks/useClock.js';
import '../styles/topbar.css';

export default function TopBar() {
  const { date, time } = useClock();

  return (
    <header className="topbar">
      <div className="topbar__clock" aria-label={`Local time in India: ${date}, ${time}`}>
        <span>{date}</span>
        <span>{time} IST</span>
      </div>
      <a className="topbar__mark" href="#top" aria-label="Naman Verma, back to top">
        Naman Verma
      </a>
      <a className="btn btn--lime topbar__cta" href="#contact">
        Contact
      </a>
    </header>
  );
}
