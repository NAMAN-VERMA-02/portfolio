import { Link } from '../router.jsx';

export default function NextPage({ to, label, kicker = 'Next' }) {
  return (
    <Link to={to} label={label} className="next-page" data-cursor="Next">
      <div className="container">
        <span className="eyebrow">{kicker} →</span>
        <span className="next-page__title">{label}</span>
      </div>
    </Link>
  );
}
