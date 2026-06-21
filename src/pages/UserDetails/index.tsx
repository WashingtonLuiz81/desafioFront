import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { githubApi } from '../../services';
import type { GithubRepository, GithubUser } from '../../types';
import { RepositoryCard } from '../../components';

export function UserDetails() {
  const { username } = useParams();

  const [repositories, setRepositories] = useState<GithubRepository[]>([]);

  const [user, setUser] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      if (!username) return;

      try {
        setIsLoading(true);
        setErrorMessage('');

        const safeUsername = encodeURIComponent(username);
        const [userResponse, repositoriesResponse] = await Promise.all([
          githubApi.get<GithubUser>(`/users/${safeUsername}`),
          githubApi.get<GithubRepository[]>(`/users/${safeUsername}/repos`),
        ]);

        const sortedRepositories = repositoriesResponse.data.sort(
          (currentRepository, nextRepository) =>
            nextRepository.stargazers_count - currentRepository.stargazers_count,
        );

        setUser(userResponse.data);
        setRepositories(sortedRepositories);
      } catch {
        setErrorMessage('Não foi possível encontrar esse usuário.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (isLoading) {
    return <p>Carregando usuário...</p>;
  }

  if (errorMessage) {
    return (
      <section>
        <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
          Voltar
        </Link>

        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section>
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
        Voltar
      </Link>

      <div className="card shadow-sm">
        <div className="card-body d-flex gap-3 flex-column flex-md-row align-items-md-center">
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            width={96}
            height={96}
            className="rounded-circle"
          />

          <div>
            <h1 className="h3 mb-1">{user.name || user.login}</h1>
            <p className="text-muted mb-2">@{user.login}</p>

            {user.bio && <p className="mb-2">{user.bio}</p>}

            <p className="mb-1">
              <strong>Seguidores:</strong> {user.followers}
            </p>

            <p className="mb-1">
              <strong>Seguindo:</strong> {user.following}
            </p>

            <p className="mb-0">
              <strong>E-mail:</strong> {user.email || 'Não informado'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Repositórios</h2>
          <span className="text-muted small">
            {repositories.length} encontrados
          </span>
        </div>

        {repositories.length === 0 ? (
          <div className="alert alert-info" role="status">
            Nenhum repositório público encontrado.
          </div>
        ) : (
          <div className="row g-3">
            {repositories.map((repository) => (
              <div className="col-12 col-md-6 col-xl-4" key={repository.id}>
                <RepositoryCard repository={repository} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}