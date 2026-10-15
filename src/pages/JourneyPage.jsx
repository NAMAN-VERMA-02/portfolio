import PageHero from '../components/PageHero.jsx';
import Journey from '../components/Journey.jsx';
import NextPage from '../components/NextPage.jsx';

export default function JourneyPage() {
  return (
    <div className="page">
      <PageHero
        index="05 / Journey"
        kicker="Education · Hackathons · Certificates"
        title="Journey"
        lead="From Ajmani Public School to KIET, and from my first repository to building on stage at CodeX 3.0."
      />
      <Journey />
      <NextPage to="/contact" label="Contact" kicker="Say hello" />
    </div>
  );
}
