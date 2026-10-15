import '../styles/notfound.css';

export default function NotFound() {
  return (
    <main className="notfound">
      <p>
        The page you were looking for
        <br />
        can't be found.
      </p>
      <h1 aria-label="404">404</h1>
      <a className="btn btn--lime" href="/">
        Back home
      </a>
    </main>
  );
}
