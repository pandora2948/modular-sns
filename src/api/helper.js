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

export function getServerUrlByMode(mode = 'development') {
  switch (mode) {
    case 'production':
      throw Error('배포 환경이 정의되지 않았습니다.');
    case 'test':
      return 'http://3.35.123.154:8080';
    default:
      return 'http://localhost:8080';
  }
}
