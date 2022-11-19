const color = {
  info: '#0490C8',
  success: '#22bb33',
  warn: '#DE793B',
  error: '#C73333',
};

export function printRequestLog({ method, endPoint, requestObj, config }) {
  console.log(
    `%c${method.toUpperCase()} ${endPoint} [REQ]`,
    `color: ${color.info};font-weight: bold;`,
    requestObj ?? ''
  );
  console.log(`%c${method.toUpperCase()} ${endPoint} [CONFIG]`, `color: ${color.info};font-weight: bold;`, config);
}

export function printResponseLog({ method, endPoint, responseObj }) {
  console.log(`%c${method.toUpperCase()} ${endPoint} [RES]`, `color: ${color.success};font-weight: bold`, responseObj);
}

export function printErrorLog({ method, endPoint, errorMessage, errorObj }) {
  console.log(
    `%c${method.toUpperCase()} ${endPoint} [ERR]`,
    `color: ${color.error};font-weight: bold`,
    errorMessage,
    errorObj
  );
}
