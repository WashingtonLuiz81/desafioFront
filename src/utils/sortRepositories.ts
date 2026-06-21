import type { GithubRepository } from '../types';

export type RepositorySortOption =
  | 'stars-desc'
  | 'stars-asc'
  | 'name-asc'
  | 'name-desc'
  | 'updated-desc';

export function sortRepositories(
  repositories: GithubRepository[],
  sortOption: RepositorySortOption,
) {
  const sortedRepositories = [...repositories];

  switch (sortOption) {
    case 'stars-asc':
      return sortedRepositories.sort(
        (current, next) =>
          current.stargazers_count - next.stargazers_count,
      );

    case 'name-asc':
      return sortedRepositories.sort((current, next) =>
        current.name.localeCompare(next.name),
      );

    case 'name-desc':
      return sortedRepositories.sort((current, next) =>
        next.name.localeCompare(current.name),
      );

    case 'updated-desc':
      return sortedRepositories.sort(
        (current, next) =>
          new Date(next.updated_at).getTime() -
          new Date(current.updated_at).getTime(),
      );

    case 'stars-desc':
    default:
      return sortedRepositories.sort(
        (current, next) =>
          next.stargazers_count - current.stargazers_count,
      );
  }
}