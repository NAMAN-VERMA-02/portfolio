import { useEffect, useRef, useState } from 'react';

const GLYPHS = '01<>/\{}[]#%&*+=?$@!~^_|ΣΔΛΞ';

// Text that "decodes" from random glyphs into the real string.
// Plays when it scrolls into view, and again on hover if `hover` is set.
export default function GlyphText({ text, as: Tag = 'span', className = '', hover = false, delay = 0, speed = 28 }) {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  const timer = useRef(0);

  const play = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer.current);
    let frame = 0;
    const total = text.length;
    timer.current = setInterval(() => {
      frame += 1;
      const solved = Math.floor(frame / 1.6);
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < solved ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join('')
      );
      if (solved >= total) {
        clearInterval(timer.current);
        setOut(text);
      }
    }, speed);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(play, delay);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag ref={ref} className={`glyph ${className}`} onMouseEnter={hover ? play : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
