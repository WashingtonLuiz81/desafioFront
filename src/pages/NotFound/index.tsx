import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="text-center py-5">
      <h1 className="h2">Página não encontrada</h1>
      <p className="text-muted">A rota acessada não existe.</p>

      <Link to="/" className="btn btn-primary">
        Voltar para início
      </Link>
    </section>
  );
}