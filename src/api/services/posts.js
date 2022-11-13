import { api } from 'api/client';

export const PostsService = {
  /**
   * @description 게시글(피드) 정보를 불러옵니다. ( 기본 게시글 갯수: 3 )
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getPosts({ count }) {
    return await api.post('/posts', { count });
  },

  /**
   * @description 해시태그 값들을 받아서, 대응하는 게시글을 반환합니다.
   * @param hashtags 배열로 구성된 해시태그 문자열
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getSearchPosts({ hashtags }) {
    return await api.post('/posts/search', { hashtags });
  },
};
