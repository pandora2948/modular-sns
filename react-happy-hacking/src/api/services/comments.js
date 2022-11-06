import { api } from 'api/client';

export const CommentsService = {
  /**
   * @description 댓글을 작성합니다.
   * @param id 게시글 id 값
   * @param comment 댓글 내용
   * @returns {Promise<AxiosResponse<any>>}
   */
  async postComment({ id, comment }) {
    return await api.post(`/comments/${id}`, { comment });
  },
};
