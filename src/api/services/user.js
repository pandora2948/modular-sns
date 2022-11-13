import { api } from '../client';

export const UserService = {
  /**
   * @description 토큰 값에 인증된 사용자 정보 기반으로 사용자 정보 객체를 반환합니다.
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getLoginedUser() {
    return await api.get('/user');
  },

  /**
   * @description 사용자이름 기반으로 사용자 정보 객체를 반환합니다.
   * @param username
   * @returns {Promise<*|undefined>}
   */
  async getUserByUsername(username) {
    return await api.get(`/user?username=${username}`);
  },

  /**
   * @description 사용자 정보를 모두 객체로 받고, 해당 정보내용대로 사용자 정보를 업데이트합니다.
   * @param email
   * @param username
   * @param password
   * @returns {Promise<*|undefined>}
   */
  async updateLoginedUser({ email, username, password }) {
    return await api.put('/user', { email, username, password });
  },

  /**
   * @description 패스워드 값을 전달받고 사용자를 데이터베이스에서 삭제합니다.
   * @param password
   * @returns {Promise<*|undefined>}
   */
  async deleteLoginedUser(password) {
    return await api.delete('/user', { password });
  },

  /**
   * @description 로그인 된 사용자의 팔로워 사용자들의 이름 리스트를 반환합니다.
   * @returns {Promise<String[]>}
   */
  async getFollowerUsernameList() {
    return await api.get('/user/follower');
  },

  /**
   * @description 로그인 된 사용자의 팔로잉 사용자들의 이름 리스트를 반환합니다.
   * @returns {Promise<String[]>}
   */
  async getFollowingUsernameList() {
    return await api.get('/user/following');
  },

  /**
   * @description username 을 받아서 로그인 된 사용자와 팔로우,팔로잉 관계를 맺습니다.
   * @param username 팔로우 할 대상 이름
   * @returns {Promise<void>}
   */
  async addFollow(username) {
    return await api.get(`/user/follow?username=${username}`);
  },

  /**
   * @description username 을 받아서 로그인 된 사용자와 팔로우,팔로잉 관계를 손절합니다.
   * @param username 팔로우 제거 할 대상 이름
   * @returns {Promise<void>}
   */
  async removeFollow(username) {
    return await api.delete(`/user/follow?username=${username}`);
  },
};
