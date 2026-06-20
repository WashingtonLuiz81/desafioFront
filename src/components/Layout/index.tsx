import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app">
      <header className="border-bottom bg-white">
        <nav className="navbar navbar-expand container py-3" aria-label="Menu principal">
          <Link className="navbar-brand fw-bold" to="/">
            GitHub Repo Explorer
          </Link>
        </nav>
      </header>

      <main className="container py-4" id="main-content">
        <Outlet />
      </main>

      <footer className="border-top py-3 mt-auto">
        <div className="container small text-muted">
          Dados fornecidos pela API pública do GitHub.
        </div>
      </footer>
    </div>
  );
}