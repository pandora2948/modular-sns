/**
 * @desc 서버의 응답 데이터에서 data 값만을 추출하여 객체로 반환합니다.
 * @param data 요청 데이터
 */
export const parseSuccessResponse = ({ data }) => data;

export const parseFailureResponse = (e) => e.data;
