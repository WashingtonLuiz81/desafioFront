import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
});