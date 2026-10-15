import '../styles/marquee.css';

export default function Marquee({ items, tone = 'paper', reverse = false, speed = 32 }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee marquee--${tone}`} aria-label={items.join(', ')}>
      <div
        className={`marquee__track ${reverse ? 'is-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {row.map((s, i) => (
          <span key={i}>
            {s} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}
