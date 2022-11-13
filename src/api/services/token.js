import { api } from 'api/client';

export const TokenService = {
  /**
   * @description 사용자 인증정보를 새로 갱신합니다.
   * @param refresh 로그인 요청 때 응답받은 refreshToken
   * @returns {Promise<AxiosResponse<any>>}
   */
  async refreshAccessToken({ refresh }) {
    return await api.get('/token/reissue', {
      headers: {
        authorization: `Bearer ${refresh}`,
      },
    });
  },
};
