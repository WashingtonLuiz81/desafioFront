export interface GithubUser {
  name: string | null;
  email: string | null;
  login: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  html_url: string;
}

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}