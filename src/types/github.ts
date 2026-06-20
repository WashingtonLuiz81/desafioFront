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