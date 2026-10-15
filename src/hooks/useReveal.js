import { useEffect } from 'react';

// Adds .is-visible to every [data-reveal] element once it scrolls into view.
// Also counts up any [data-count] number. Re-runs when `key` (the page) changes.
export function useReveal(key) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible), [data-count]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // reveal on entering view, or if a fast scroll already carried it past the top
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
          entry.target.classList.add('is-visible');
          if (entry.target.dataset.count) countUp(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    // wait a frame so the new page is in the DOM
    const id = requestAnimationFrame(() => els.forEach((el) => io.observe(el)));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [key]);
}

function countUp(el) {
  const end = parseFloat(el.dataset.count);
  const decimals = (el.dataset.count.split('.')[1] || '').length;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const start = performance.now();
  const dur = 1400;
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur);
    el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = el.dataset.count;
  };
  requestAnimationFrame(tick);
}
