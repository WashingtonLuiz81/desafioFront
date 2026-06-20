import { Link, useParams } from 'react-router-dom';

export function UserDetails() {
  const { username } = useParams();

  return (
    <section>
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
        Voltar
      </Link>

      <h1 className="h2">Usuário: {username}</h1>
      <p className="text-muted">
        Na próxima fase vamos buscar os dados do usuário e listar os repositórios.
      </p>
    </section>
  );
}