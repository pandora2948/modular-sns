import axios from 'axios';

const getURLByEnvironment = () =>
  process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : '<production_url>';

export const apiClient = axios.create({
  baseURL: getURLByEnvironment(),
  timeout: 5000,
});
