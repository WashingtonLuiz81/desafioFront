import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { githubApi } from '../../services';
import type { GithubRepository, GithubUser } from '../../types';
import { RepositoryCard, Loading, ErrorMessage } from '../../components';

import { sortRepositories } from '../../utils';
import type { RepositorySortOption } from '../../utils';

export function UserDetails() {
  const { username } = useParams();

  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [visibleRepositories, setVisibleRepositories] = useState(6);

  const [user, setUser] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [sortOption, setSortOption] =
    useState<RepositorySortOption>('stars-desc');

  
  const sortedRepositories = useMemo(() => {
    return sortRepositories(repositories, sortOption);
  }, [repositories, sortOption]);

  const repositoriesToShow = sortedRepositories.slice(0, visibleRepositories);

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
        setVisibleRepositories(6);
      } catch {
        setErrorMessage('Não foi possível encontrar esse usuário.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (isLoading) {
     return <Loading message="Carregando usuário..." />;
  }

  if (errorMessage) {
    return (
      <section>
        <Link to="/" className="back-link mb-4">
          ← Voltar
        </Link>

        <ErrorMessage message={errorMessage} />
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section>
      <Link to="/" className="back-link mb-4">
        ← Voltar
      </Link>

      <div className="card profile-card shadow-sm">
        <div className="card-body d-flex gap-3 flex-column flex-md-row align-items-md-center">
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            width={96}
            height={96}
            className="rounded-circle avatar-image"
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
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
          <div>
            <h2 className="h4 mb-1">Repositórios</h2>
            <span className="text-muted small">
              {repositories.length} encontrados
            </span>
          </div>

          <div>
            <label htmlFor="repository-sort" className="form-label small mb-1">
              Ordenar por
            </label>

            <select
              id="repository-sort"
              className="form-select"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as RepositorySortOption)
              }
            >
              <option value="stars-desc">Mais estrelas</option>
              <option value="stars-asc">Menos estrelas</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
              <option value="updated-desc">Atualizados recentemente</option>
            </select>
          </div>
        </div>

        {repositories.length === 0 ? (
          <div className="alert alert-info" role="status">
            Nenhum repositório público encontrado.
          </div>
        ) : (
          <>
            <div className="row g-3">
              {repositoriesToShow.map((repository) => (
                <div className="col-12 col-md-6 col-xl-4" key={repository.id}>
                  <RepositoryCard repository={repository} />
                </div>
              ))}
            </div>

            {visibleRepositories < sortedRepositories.length && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setVisibleRepositories((current) => current + 6)}
                >
                  Carregar mais repositórios
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}