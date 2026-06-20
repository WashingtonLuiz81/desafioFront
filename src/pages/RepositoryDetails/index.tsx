import { Link, useParams } from 'react-router-dom';

export function RepositoryDetails() {
  const { owner, repo } = useParams();

  return (
    <section>
      <Link to={`/user/${owner}`} className="btn btn-outline-secondary btn-sm mb-3">
        Voltar
      </Link>

      <h1 className="h2">{repo}</h1>
      <p className="text-muted">
        Repositório de {owner}. Na próxima fase vamos consumir os detalhes pela API.
      </p>
    </section>
  );
}