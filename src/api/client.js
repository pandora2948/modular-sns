import { getErrorMessage, getRequestArgs, getServerUrlByMode } from 'api/helper';
import { setAccessToken, logRequest } from 'api/interceptors/request';
import { logError, logResponse } from 'api/interceptors/response';
import { AuthService } from 'api/services';
import axios from 'axios';
import flow from 'lodash/flow';
import { token } from 'utils';

const { REACT_APP_MODE } = process.env;

const API_URL = getServerUrlByMode(REACT_APP_MODE);
const tokenErrorStatusList = [401, 403];

const _axios = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

_axios.interceptors.request.use(flow([logRequest, setAccessToken]), undefined);
_axios.interceptors.response.use(logResponse, logError);

const axiosWrapper = async (method, route, body, config = {}) => {
  const args = getRequestArgs(method, route, body, config);

  if (!args.length) {
    throw new Error('Invalid axios method');
  }

  try {
    const {
      data: { data },
    } = await _axios[method](...args);

    return data;
  } catch (e) {
    const { url, status } = e.response?.data ?? e.config?.data ?? {};

    if (e.response?.data?.error === '헤더에 토큰이 존재하지 않습니다.') {
      token.clear();
      window.location = '/auth/sign-in';
    }

    const errorMessage = getErrorMessage(e);

    if (!tokenErrorStatusList.includes(status) || url === '/auth/reissue') {
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

      return data;
    } catch (e) {
      token.clear();
      window.location = '/auth/sign-in';
    }
  }
};

export const api = {
  get: (route, config) => axiosWrapper('get', route, {}, config),
  head: (route, config) => axiosWrapper('head', route, {}, config),
  delete: (route, config) => axiosWrapper('delete', route, {}, config),
  post: (route, body, config) => axiosWrapper('post', route, body ?? {}, config),
  put: (route, body, config) => axiosWrapper('put', route, body ?? {}, config),
  patch: (route, body, config) => axiosWrapper('patch', route, body ?? {}, config),
};
