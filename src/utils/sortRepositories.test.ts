import { describe, expect, it } from 'vitest';

import { sortRepositories } from './sortRepositories';
import type { GithubRepository } from '../types';

const repositories = [
  {
    id: 1,
    name: 'beta',
    full_name: 'user/beta',
    description: null,
    stargazers_count: 10,
    language: 'TypeScript',
    html_url: 'https://github.com/user/beta',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 2,
    name: 'alpha',
    full_name: 'user/alpha',
    description: null,
    stargazers_count: 50,
    language: 'JavaScript',
    html_url: 'https://github.com/user/alpha',
    updated_at: '2024-03-10T00:00:00Z',
  },
  {
    id: 3,
    name: 'gamma',
    full_name: 'user/gamma',
    description: null,
    stargazers_count: 20,
    language: null,
    html_url: 'https://github.com/user/gamma',
    updated_at: '2024-02-10T00:00:00Z',
  },
] satisfies GithubRepository[];

describe('sortRepositories', () => {
  it('sorts by stars descending', () => {
    const result = sortRepositories(repositories, 'stars-desc');

    expect(result.map((repository) => repository.name)).toEqual([
      'alpha',
      'gamma',
      'beta',
    ]);
  });

  it('sorts by stars ascending', () => {
    const result = sortRepositories(repositories, 'stars-asc');

    expect(result.map((repository) => repository.name)).toEqual([
      'beta',
      'gamma',
      'alpha',
    ]);
  });

  it('sorts by name ascending', () => {
    const result = sortRepositories(repositories, 'name-asc');

    expect(result.map((repository) => repository.name)).toEqual([
      'alpha',
      'beta',
      'gamma',
    ]);
  });

  it('sorts by last update', () => {
    const result = sortRepositories(repositories, 'updated-desc');

    expect(result.map((repository) => repository.name)).toEqual([
      'alpha',
      'gamma',
      'beta',
    ]);
  });
});