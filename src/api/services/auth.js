import { api } from 'api/client';

export const AuthService = {
  /**
   * @description 사용자 회원가입 요청입니다. 사용 전 폼 검증 필수입니다.
   * @param username 회원가입 받을 사용자 이름
   * @param email 회원가입 받을 사용자 이메일
   * @param password 회원가입 받을 사용자 패스워드
   * @returns {Promise<AxiosResponse<any>>}
   */
  async createUser({ username, email, password }) {
    return await api.post('/auth/signup', {
      username,
      email,
      password,
    });
  },

  /**
   * @description 인증을 요청하여 토큰 값을 반환받습니다.
   * @param email 로그인 이메일 정보
   * @param password 로그인 패스워드 정보
   * @returns {Promise<AxiosResponse<any>>}
   */
  async login({ email, password }) {
    return await api.post('/auth/login', {
      email,
      password,
    });
  },

  /**
   * @description refreshToken 을 헤더에 포함시켜 accessToken 을 새로 발급 받습니다.
   * @param refresh refresToken 값
   * @returns {Promise<AxiosResponse<{ data: { accessToken: string } }>>}
   */
  async reIssueAccessTokenByRefreshToken({ refresh }) {
    return await api.get('/token/reissue', {
      headers: {
        authorization: `Bearer ${refresh}`,
      },
    });
  },
};
