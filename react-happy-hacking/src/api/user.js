import { apiClient } from './client';
import { parseSuccessResponse, parseFailureResponse } from './helper';


/**
 * @description 사용자 정보를 불러옵니다.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserApi = () =>
  apiClient.get('/api/user')
    .then(parseSuccessResponse)
    .catch(parseFailureResponse);


/**
 * @description 인증을 요청하여 토큰 값을 반환받습니다.
 * @param email 로그인 이메일 정보
 * @param password 로그인 패스워드 정보
 * @returns {Promise<AxiosResponse<any>>}
 */
export const loginUserApi = (email, password) =>
  apiClient.post('/api/user/login', {
    email, password,
  })
    .then(parseSuccessResponse)
    .catch(parseFailureResponse);


/**
 * @description 사용자 회원가입 요청입니다. 사용 전 폼 검증 필수입니다.
 * @param username 회원가입 받을 사용자 이름
 * @param email 회원가입 받을 사용자 이메일
 * @param password 회원가입 받을 사용자 패스워드
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createUserApi = ({
  username,
  email,
  password,
}) =>
  apiClient.post('/api/user/register', {
    username,
    email,
    password
  })
    .then(parseSuccessResponse)
    .then(parseFailureResponse);


/**
 * @description 사용자 인증정보를 새로 갱신합니다.
 * @param refresh 로그인 요청 때 응답받은 refreshToken
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAccessTokenAPI = refresh =>
  apiClient.post('/api/token/refresh', { refresh })
    .then(parseSuccessResponse)
    .catch(parseFailureResponse);
