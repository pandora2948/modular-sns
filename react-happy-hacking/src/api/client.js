import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : '<production_url>';

export const _axios = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const axiosWrapper = async (method, route, body, config) => {
  let bodyArr = [];
  switch (method) {
    case 'get':
    case 'delete':
    case 'head':
      bodyArr = [route, config];
      break;
    case 'post':
    case 'put':
    case 'patch':
      bodyArr = [route, body, config];
      break;
    default:
      break;
  }

  if (!bodyArr.length) {
    throw new Error('Invalid axios method');
  }

  try {
    const { data } = await _axios[method](...bodyArr);

    if (data.error) {
      throw data;
    }

    return data;
  } catch (e) {
    throw new Error(e.error.message ?? e.error ?? e);
  }
};

export const api = {
  get: (route, config) => axiosWrapper('get', route, {}, config),
  head: (route, config) => axiosWrapper('head', route, {}, config),
  delete: (route, config) => axiosWrapper('delete', route, {}, config),
  post: (route, body, config) => axiosWrapper('post', route, body, config),
  put: (route, body, config) => axiosWrapper('put', route, body, config),
  patch: (route, body, config) => axiosWrapper('patch', route, body, config),
};
