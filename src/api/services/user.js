import { api } from 'api/client';

export const UserService = {
  /**
   * @description 사용자 정보를 불러옵니다.
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getUser() {
    return await api.get('/user');
  },

  /**
   * @description 사용자 회원가입 요청입니다. 사용 전 폼 검증 필수입니다.
   * @param username 회원가입 받을 사용자 이름
   * @param email 회원가입 받을 사용자 이메일
   * @param password 회원가입 받을 사용자 패스워드
   * @returns {Promise<AxiosResponse<any>>}
   */
  async createUser({ username, email, password }) {
    return await api.post('/user/register', {
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
    return await api.post('/user/login', {
      email,
      password,
    });
  },
};
