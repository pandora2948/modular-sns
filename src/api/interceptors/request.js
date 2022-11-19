import { printRequestLog, token } from 'utils';

const routesWithoutAccessToken = ['/auth/login', '/auth/signup', '/auth/reissue'];

export function logRequest(config) {
  printRequestLog({
    method: config.method,
    endPoint: config.url,
    requestObj: config.data,
    config,
  });

  return config;
}

export function setAccessToken(config) {
  if (routesWithoutAccessToken.includes(config.url)) {
    return config;
  }

  const accessToken = token.accessToken.get();

  if (!accessToken) {
    return config;
  }

  config.headers['authorization'] = `Bearer ${accessToken}`;
  return config;
}
