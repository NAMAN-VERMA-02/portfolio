import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// A tiny router: history API + a curtain transition between pages.
// phase: 'idle' → 'cover' (curtain closes) → 'reveal' (new page, curtain opens) → 'idle'
const RouterContext = createContext(null);

const COVER_MS = 520;
const REVEAL_MS = 650;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function RouterProvider({ children, onNavigate }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));
  const [phase, setPhase] = useState('idle');
  const [target, setTarget] = useState('');
  const busy = useRef(false);

  const go = useCallback(
    (to, label = '') => {
      const [pathname, hash] = to.split('#');
      const next = normalize(pathname || path);
      if (next === path) {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        else onNavigate?.(0);
        return;
      }
      if (busy.current) return;
      busy.current = true;

      const swap = () => {
        window.history.pushState({}, '', to);
        setPath(next);
        onNavigate?.(hash ? document.getElementById(hash) : 0, true);
      };

      if (reduced()) {
        swap();
        busy.current = false;
        return;
      }
      setTarget(label);
      setPhase('cover');
      setTimeout(() => {
        swap();
        setPhase('reveal');
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
          if (hash) document.getElementById(hash)?.scrollIntoView();
        }, REVEAL_MS);
      }, COVER_MS);
    },
    [path, onNavigate]
  );

  useEffect(() => {
    const onPop = () => {
      setPath(normalize(window.location.pathname));
      onNavigate?.(0, true);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [onNavigate]);

  return <RouterContext.Provider value={{ path, phase, target, go }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

export function Link({ to, label, children, onClick, ...rest }) {
  const { go } = useRouter();
  const external = /^(https?:|mailto:)/.test(to);
  if (external) {
    return (
      <a href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        go(to, label ?? (typeof children === 'string' ? children : ''));
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

function normalize(p) {
  const s = p.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  return s === '' ? '/' : s;
}
