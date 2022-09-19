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
