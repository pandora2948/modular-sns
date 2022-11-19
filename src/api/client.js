import { AuthService } from 'api/services';
import axios from 'axios';
import { token, printRequestLog, printResponseLog, printErrorLog } from 'utils';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : '<production_url>';
const routesWithoutAccessToken = ['/auth/login', '/auth/signup', '/auth/reissue'];
const tokenErrorStatusList = [401, 403];

const _axios = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

_axios.interceptors.request.use(async (config) => {
  printRequestLog({
    method: config.method,
    endPoint: config.url,
    requestObj: config.data,
    config,
  });

  if (routesWithoutAccessToken.includes(config.url)) {
    return config;
  }

  const accessToken = token.accessToken.get();

  if (!accessToken) {
    return config;
  }

  config.headers['authorization'] = `Bearer ${accessToken}`;
  return config;
}, undefined);

function getRequestArgs(method, route, body, config = {}) {
  let args = [];

  switch (method) {
    case 'get':
    case 'delete':
    case 'head':
      args = [route, config];
      break;
    case 'post':
    case 'put':
    case 'patch':
      args = [route, body, config];
      break;
    default:
      break;
  }

  return args;
}

const axiosWrapper = async (method, route, body, config = {}) => {
  const args = getRequestArgs(method, route, body, config);

  if (!args.length) {
    throw new Error('Invalid axios method');
  }

  try {
    const {
      data: { data },
    } = await _axios[method](...args);

    printResponseLog({
      method,
      endPoint: route,
      responseObj: data,
    });

    return data;
  } catch (e) {
    const {
      response: { data, status },
    } = e;

    const errorMessage =
      data?.data?.message /* server error */ ??
      data?.data?.error /* server error */ ??
      data?.error?.message /* server error */ ??
      data?.error /* server error */ ??
      data?.message /* http error */ ??
      data?.error /* http error */ ??
      e.message /* http error */ ??
      'Unknown error occurred';

    printErrorLog({
      method,
      endPoint: route,
      errorMessage,
      errorObj: e,
    });

    if (!tokenErrorStatusList.includes(status) || route === '/auth/reissue') {
      throw new Error(errorMessage);
    }

    try {
      const refreshToken = token.refreshToken.get();
      if (!refreshToken) {
        throw new Error(errorMessage);
      }

      const { accessToken: newAccessToken } = await AuthService.reIssueAccessToken({ refreshToken });

      token.accessToken.set(newAccessToken);

      const {
        data: { data },
      } = await _axios[method](...args);

      printResponseLog({
        method,
        endPoint: route,
        responseObj: data,
      });

      return data;
    } catch (e) {
      const data = e?.response?.data;

      const errorMessage =
        data?.data?.message /* server error */ ??
        data?.data?.error /* server error */ ??
        data?.error?.message /* server error */ ??
        data?.error /* server error */ ??
        data?.message /* http error */ ??
        data?.error /* http error */ ??
        e.message /* http error */ ??
        'Unknown error occurred';

      printErrorLog({
        method,
        endPoint: route,
        errorMessage,
        errorObj: e,
      });

      token.clear();
      window.location = '/auth/sign-in';
    }
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
