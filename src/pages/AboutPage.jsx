import PageHero from '../components/PageHero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import NextPage from '../components/NextPage.jsx';
import { profile } from '../data/profile.js';

export default function AboutPage() {
  return (
    <div className="page">
      <PageHero
        index="04 / About"
        kicker={`${profile.degree} · ${profile.section} · ${profile.year}`}
        title="About"
      />
      <About />
      <Skills />
      <NextPage to="/journey" label="Journey" />
    </div>
  );
}
