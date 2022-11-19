import { AuthService } from 'api/services';
import axios, { AxiosError } from 'axios';
import { token, printRequestLog, printResponseLog, printErrorLog } from 'utils';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : '<production_url>';
const authRoutes = ['/auth/login', '/auth/signup', '/token/reissue'];
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

  if (authRoutes.includes(config.url)) {
    // console.warn('auth 요청이면 토큰 당연히 없으므로 패스');
    return config;
  }

  const { accessToken, refreshToken } = token.get();

  // TODO: abort | cancel 하면서 리디렉션 처리 가능?
  if (!accessToken && !refreshToken) {
    // console.warn('둘 다 없으면 에러 날거 알지만 받는 곳에서 에러 컨트롤 할거니까 일단 패스');
    return config;
  }

  if (accessToken) {
    // console.warn('accessToken 있다면 헤더에 세팅 후 요청');
    config.headers['authorization'] = `Bearer ${accessToken}`;
    return config;
  }

  try {
    // console.warn('accessToken 없다면 리프레쉬 토큰으로 새 토큰 받아서 세팅 후 요청');
    const {
      data: { accessToken: newAccessToken },
    } = await AuthService.reIssueAccessToken({ refreshToken });
    token.accessToken.set(newAccessToken);
    config.headers['authorization'] = `Bearer ${newAccessToken}`;
    return config;
  } catch {
    // console.warn('에러 날거 알지만 받는 곳에서 에러 컨트롤 할거니까 일단 패스');
    return config;
  }
}, undefined);

const axiosWrapper = async (method, route, body, config = {}) => {
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
    const {
      data: { data },
    } = await _axios[method](...bodyArr);

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
      data.data.message /* server error */ ??
      data.data.error /* server error */ ??
      data.error.message /* http error */ ??
      data.message /* http error */ ??
      data.error /* http error */ ??
      e.message; /* http error */

    printErrorLog({
      method,
      endPoint: route,
      errorMessage,
      errorObj: e,
    });

    if (e instanceof AxiosError && tokenErrorStatusList.includes(status)) {
      console.warn('토큰 에러 발생: 401, 403');
      window.location = '/auth/sign-in';
      return;
    }

    throw new Error(errorMessage);
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
