import { useEffect } from 'react';
import { RouterProvider, useRouter } from './router.jsx';
import TopBar from './components/TopBar.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import Curtain from './components/Curtain.jsx';
import Loader from './components/Loader.jsx';
import NotFound from './components/NotFound.jsx';
import HomePage from './pages/HomePage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import CodexPage from './pages/CodexPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import JourneyPage from './pages/JourneyPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { findProject } from './data/projects.js';
import { useReveal } from './hooks/useReveal.js';
import { useSmoothScroll } from './hooks/useSmoothScroll.js';

function resolve(path) {
  if (path === '/') return { el: <HomePage />, title: 'Naman Verma · CS Student & Developer' };
  if (path === '/work') return { el: <WorkPage />, title: 'Work · Naman Verma' };
  if (path === '/codex') return { el: <CodexPage />, title: 'CodeX 3.0 · Naman Verma' };
  if (path === '/about') return { el: <AboutPage />, title: 'About · Naman Verma' };
  if (path === '/journey') return { el: <JourneyPage />, title: 'Journey · Naman Verma' };
  if (path === '/contact') return { el: <ContactPage />, title: 'Contact · Naman Verma' };
  const m = path.match(/^\/work\/([\w-]+)$/);
  const project = m && findProject(m[1]);
  if (project) return { el: <ProjectPage project={project} />, title: `${project.title} · Naman Verma` };
  return null;
}

function Shell() {
  const { path } = useRouter();
  const page = resolve(path);
  useReveal(path);

  useEffect(() => {
    document.title = page ? page.title : 'Not found · Naman Verma';
  }, [path, page]);

  if (!page) return <NotFound />;
  return (
    <>
      <TopBar />
      <main key={path}>{page.el}</main>
      <Footer />
    </>
  );
}

export default function App() {
  const scrollTo = useSmoothScroll();
  return (
    <RouterProvider onNavigate={scrollTo}>
      <Loader />
      <Shell />
      <Curtain />
      <Cursor />
    </RouterProvider>
  );
}
