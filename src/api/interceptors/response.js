import { getErrorMessage } from 'api/helper';
import { printErrorLog, printResponseLog } from 'utils';

export function logResponse(response) {
  const {
    config: { url, method },
    data,
  } = response;

  printResponseLog({
    method,
    endPoint: url,
    responseObj: data,
  });

  return response;
}

export function logError(e) {
  const {
    config: { url, method },
  } = e;

  const errorMessage = getErrorMessage(e);

  printErrorLog({
    method,
    endPoint: url,
    errorMessage,
    errorObj: e,
  });

  return Promise.reject(e);
}
