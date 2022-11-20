import { api } from 'api/client';
import qs from 'qs';

/**
 * @suppress 파일 업로드, 파일 get 관련 기능은 아직 지원하지 않습니다. 2022-11-15
 */
export const PostsService = {
  /**
   * @description 필터링 없이 모든 게시글을 생성 일자 순으로 가져옵니다. ( 페이지네이션을 지원합니다. )
   * page, size 옵션을 완전 배제할 경우 모든 게시글을 반환합니다.
   * @param page page * size 만큼 생략함
   * @param size 가져올 게시글 개수
   * @returns {Promise<any>}
   */
  async getPosts({ page, size }) {
    return await api.get(
      `/posts/list?${qs.stringify({
        page,
        size,
      })}`
    );
  },

  /**
   * @description 해당 게시글 id (고유 번호) 에 대응하는 게시글 정보를 가져옵니다.
   * @param postId 게시글 id (고유 번호)
   * @returns 게시글 데이터를 반환합니다. {Promise<any>}
   */
  async getPostsById({ postId }) {
    return await api.get(`/posts/${postId}`);
  },

  /**
   * @description 로그인 된 사용자의 게시글을 생성 일자 순으로 가져옵니다. ( 페이지네이션을 지원합니다. )
   * page, size 옵션을 완전 배제할 경우 모든 게시글을 반환합니다.
   * @param page page * size 만큼 생략함
   * @param size 가져올 게시글 개수
   * @returns {Promise<any>}
   */
  async getUserPosts({ page, size }) {
    return await api.get(
      `/posts/token?${qs.stringify({
        page,
        size,
      })}`
    );
  },

  /**
   * @description 게시글을 생성합니다.
   * @param data 게시글 생성 데이터
   * @returns 생성된 데이터를 반환합니다. {Promise<any>}
   */
  async createPost({ title = '임시제목', textContent, hashTagList = [] }) {
    return await api.post(`/posts`, {
      title,
      textContent,
      hashTagList,
    });
  },

  /**
   * @description 사용자가 작성한 게시글이 맞는 지 검증하고 게시글을 삭제합니다.
   * @param postId 게시글 id (고유 번호)
   * @returns {Promise<void>}
   */
  async deletePost({ postId }) {
    return await api.delete(`/posts/${postId}`);
  },

  /**
   * @description 게시글을 수정합니다. 수정되지 않을 데이터를 포함해서 모든 게시글 양식을 전달받습니다. (put)
   * @param postId 수정할 게시글 id (고유 번호)
   * @param data 게시글 데이터 양식입니다. 생성 양식과 같습니다.
   * @returns {Promise<*|undefined>}
   */
  async updatePost({ postId, data }) {
    return await api.put(`/posts/${postId}`, { data });
  },

  /**
   * @description 해시태그 값들을 받아서, 대응하는 게시글을 반환합니다.
   * @param hashtags 배열로 구성된 해시태그 문자열
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getPostsByHashtags({ hashtags }) {
    return await api.get('/posts/search', { hashtags });
  },
};
