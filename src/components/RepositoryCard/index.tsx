import { Link } from 'react-router-dom';

import type { GithubRepository } from '../../types';

interface RepositoryCardProps {
  repository: GithubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const [owner, repo] = repository.full_name.split('/');

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <h2 className="h5">
          <Link to={`/repo/${owner}/${repo}`} className="text-decoration-none">
            {repository.name}
          </Link>
        </h2>

        <p className="text-muted">
          {repository.description || 'Sem descrição informada.'}
        </p>

        <div className="d-flex flex-wrap gap-3 small">
          <span>
            ⭐ <strong>{repository.stargazers_count}</strong> estrelas
          </span>

          <span>
            Linguagem: <strong>{repository.language || 'Não informada'}</strong>
          </span>
        </div>
      </div>
    </article>
  );
}