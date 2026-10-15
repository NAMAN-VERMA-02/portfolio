import GlyphText from './GlyphText.jsx';

export default function PageHero({ index, kicker, title, lead, children }) {
  return (
    <header className="page-hero">
      <div className="container">
        <div className="page-hero__eyebrow eyebrow">
          <span>{index}</span>
          <span>{kicker}</span>
        </div>
        <h1 className="page-hero__title">
          <GlyphText text={title} speed={24} />
        </h1>
        {lead && (
          <p className="page-hero__lead" data-reveal>
            {lead}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
