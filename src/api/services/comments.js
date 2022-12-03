import { api } from 'api/client';

export const CommentsService = {
  /**
   * @description 댓글을 작성합니다.
   * @param postId 게시글 id 값
   * @param textContent 작성할 댓글 텍스트 데이터
   * @param ownerId 댓글 작성자 id ( 클라이언트 유저 정보에서 상태로 관리하는 것으로 확인되며 id값 을 동봉해서 주면 서버는 연산이 더 빠릅니다. )
   *        굳이 ownerId를 동봉하지않아도 되는데 포함하는 이유에 대한 설명입니다.
   * @returns {Promise<AxiosResponse<any>>}
   */
  async postComment({ postId, textContent, ownerId }) {
    return await api.post(`/comments`, { postId, textContent, ownerId, replyUserId: null });
  },

  /**
   * @description 댓글을 수정합니다.
   * @param postId 게시글 id 값
   * @param textContent 작성할 댓글 텍스트 데이터
   * @param ownerId 댓글 작성자 id
   * @returns {Promise<AxiosResponse<any>>}
   */
  async updateComment({ postId, textContent, ownerId }) {
    return await api.put(`/comments`, { postId, textContent, ownerId, replyUserId: null });
  },

  /**
   * @description 댓글 id 정보로 댓글 객체를 조회합니다.
   * @param commentId 댓글 id
   * @returns {Promise<*|undefined>}
   */
  async getComment({ commentId }) {
    return await api.get(`/comments/${commentId}`);
  },

  /**
   * @description 댓글 id 정보로 댓글을 삭제합니다.
   * @param commentId 댓글 id
   * @returns {Promise<*|undefined>}
   */
  async deleteComment({ commentId }) {
    return await api.delete(`/comments/${commentId}`);
  },

  /**
   * @description 게시글 id 를 정보로 받아 해당 게시글의 모든 댓글을 조회합니다.
   * @param postId 게시글 id
   * @returns {Promise<*|undefined>}
   */
  async getCommentsByPostId({ postId }) {
    return await api.get(`/comments/posts/${postId}`);
  },

  /**
   * @description 사용자 이름을 정보로 받아 해당 게시글의 모든 댓글을 조회합니다.
   * @param username 사용자 이름
   * @returns {Promise<*|undefined>}
   */
  async getCommentsByUsername({ username }) {
    return await api.get(`/comments/username/${username}`);
  },
};
