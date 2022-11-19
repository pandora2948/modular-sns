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
