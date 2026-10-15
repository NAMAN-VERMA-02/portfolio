import PageHero from '../components/PageHero.jsx';
import Projects from '../components/Projects.jsx';
import NextPage from '../components/NextPage.jsx';
import { projects } from '../data/projects.js';

export default function WorkPage() {
  return (
    <div className="page">
      <PageHero
        index="02 / Work"
        kicker={`${projects.length} projects · updated daily`}
        title="Work"
        lead="Hackathon builds, web apps and coursework. Click any project for the full story: the problem, what I built and what I learned."
      />
      <Projects />
      <NextPage to="/codex" label="CodeX 3.0" />
    </div>
  );
}
