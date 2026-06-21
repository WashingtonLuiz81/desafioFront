import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { githubApi } from '../../services';
import type { GithubRepository } from '../../types';

export function RepositoryDetails() {
  const { owner, repo } = useParams();

  const [repository, setRepository] = useState<GithubRepository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchRepositoryDetails() {
      if (!owner || !repo) return;

      try {
        setIsLoading(true);
        setErrorMessage('');

        const safeOwner = encodeURIComponent(owner);
        const safeRepo = encodeURIComponent(repo);

        const response = await githubApi.get<GithubRepository>(
          `/repos/${safeOwner}/${safeRepo}`,
        );

        setRepository(response.data);
      } catch {
        setRepository(null);
        setErrorMessage('Não foi possível carregar os detalhes do repositório.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositoryDetails();
  }, [owner, repo]);

  if (isLoading) {
    return <p className="text-muted">Carregando repositório...</p>;
  }

  if (errorMessage) {
    return (
      <section>
        <Link to={owner ? `/user/${owner}` : '/'} className="btn btn-outline-secondary btn-sm mb-3">
          Voltar
        </Link>

        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      </section>
    );
  }

  if (!repository) {
    return null;
  }

  return (
    <section>
      <Link to={`/user/${owner}`} className="btn btn-outline-secondary btn-sm mb-3">
        Voltar
      </Link>

      <article className="card shadow-sm">
        <div className="card-body">
          <p className="text-muted mb-2">{repository.full_name}</p>

          <h1 className="h3 mb-3">{repository.name}</h1>

          <p className="mb-4">
            {repository.description || 'Sem descrição informada.'}
          </p>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div className="border rounded p-3 h-100">
                <span className="text-muted small d-block">Estrelas</span>
                <strong>{repository.stargazers_count}</strong>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="border rounded p-3 h-100">
                <span className="text-muted small d-block">Linguagem</span>
                <strong>{repository.language || 'Não informada'}</strong>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="border rounded p-3 h-100">
                <span className="text-muted small d-block">Atualizado em</span>
                <strong>
                  {new Date(repository.updated_at).toLocaleDateString('pt-BR')}
                </strong>
              </div>
            </div>
          </div>

          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Abrir no GitHub
          </a>
        </div>
      </article>
    </section>
  );
}