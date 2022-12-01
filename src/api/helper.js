import { ENDPOINT_LIST, MODE_NAME_LIST } from './constant';

export function getRequestArgs(method, route, body, config = {}) {
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

export function getErrorMessage(e) {
  const {
    response: { data },
  } = e;

  return (
    data?.data?.message /* server error */ ??
    data?.data?.error /* server error */ ??
    data?.error?.message /* server error */ ??
    data?.error /* server error */ ??
    data?.message /* http error */ ??
    data?.error /* http error */ ??
    e.message /* http error */ ??
    'Unknown error occurred'
  );
}

export function getServerUrlByMode(mode = MODE_NAME_LIST.DEVELOPMENT) {
  switch (mode) {
    case MODE_NAME_LIST.DEVELOPMENT:
      return ENDPOINT_LIST.DEVELOPMENT;
    case MODE_NAME_LIST.PRODUCTION:
      throw Error('배포 환경이 정의되지 않았습니다.');
    case MODE_NAME_LIST.TEST:
      return ENDPOINT_LIST.TEST;
    default:
      return ENDPOINT_LIST.DEVELOPMENT;
  }
}
