import { apiClient } from './client';
import { parseFailureResponse, parseSuccessResponse } from './helper';

/**
 * @description 게시글(피드) 정보를 불러옵니다. ( 기본 게시글 갯수: 3 )
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPosts = count =>
  apiClient.post('/api/posts', { count })
    .then(parseSuccessResponse)
    .catch(parseFailureResponse);

/**
 * @description 댓글을 작성합니다.
 * @param id 게시글 id 값
 * @param comment 댓글 내용
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postComment = (id, comment) =>
  apiClient.post(`/api/comments/${id}`, { comment })
    .catch(parseFailureResponse);

/**
 * @description 해시태그 값들을 받아서, 대응하는 게시글을 반환합니다.
 * @param hashtags 배열로 구성된 해시태그 문자열
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSearchPosts = hashtags =>
  apiClient.post('/api/posts/search', { hashtags })
    .then(parseSuccessResponse)
    .catch(parseFailureResponse);
