import { useRouter } from '../router.jsx';
import GlyphText from './GlyphText.jsx';
import '../styles/curtain.css';

// Three colour panels that sweep over the page between routes.
export default function Curtain() {
  const { phase, target } = useRouter();
  return (
    <div className={`curtain is-${phase}`} aria-hidden="true">
      <span className="curtain__panel curtain__panel--1" />
      <span className="curtain__panel curtain__panel--2" />
      <span className="curtain__panel curtain__panel--3" />
      {phase === 'cover' && target && <GlyphText className="curtain__label" text={target} speed={22} />}
    </div>
  );
}
