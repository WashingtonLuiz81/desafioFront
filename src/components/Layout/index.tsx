import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="container app-navbar" aria-label="Menu principal">
          <Link className="app-logo" to="/">
            Explorador de Repositórios
          </Link>
        </nav>
      </header>

      <main className="container app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="container">
          Dados fornecidos pela API pública do GitHub.
        </div>
      </footer>
    </div>
  );
}