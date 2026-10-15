import { useEffect, useRef, useState } from 'react';
import '../styles/cursor.css';

// Custom cursor: a dot that follows exactly and a ring that trails behind.
// Grows over links; shows a label from data-cursor="…". Off on touch screens.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [state, setState] = useState('');
  const [enabled] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input, textarea, label');
      if (!el) {
        setState('');
        setLabel('');
        return;
      }
      if (el.matches('input, textarea')) {
        setState('text');
        setLabel('');
        return;
      }
      const l = el.getAttribute('data-cursor') || '';
      setLabel(l);
      setState(l ? 'label' : 'link');
    };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');
    const leave = () => setState('hidden');
    const enter = () => setState('');

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className={`cursor-ring ${state ? `is-${state}` : ''}`} aria-hidden="true">
        <span>{label}</span>
      </div>
      <div ref={dot} className={`cursor-dot ${state ? `is-${state}` : ''}`} aria-hidden="true" />
    </>
  );
}
