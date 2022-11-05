import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '<production_url>';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
