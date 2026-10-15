export default function Tile({ label, href, fill, filled }) {
  return (
    <a className={`tile tile--${fill} ${filled ? 'is-filled' : ''}`} href={href}>
      <span className="tile__label">{label}</span>
      <span className="tile__arrow arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
