import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Smooth, weighted mouse-wheel scrolling (Lenis). Touch and reduced-motion keep native scroll.
export function useSmoothScroll() {
  const lenis = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    lenis.current = l;
    let raf = 0;
    const loop = (t) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // target: 0 / element; immediate: jump (used after page changes)
  return (target, immediate = false) => {
    if (lenis.current) lenis.current.scrollTo(target || 0, { immediate, offset: target ? -64 : 0 });
    else if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  };
}
