import { Link } from '../router.jsx';
import GlyphText from './GlyphText.jsx';

export default function Tile({ label, to, fill, filled, index }) {
  return (
    <Link className={`tile tile--${fill} ${filled ? 'is-filled' : ''}`} to={to} label={label} data-cursor="Open">
      <span className="tile__num">0{index}</span>
      <GlyphText className="tile__label" text={label} hover delay={300 + index * 120} />
      <span className="tile__arrow arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
