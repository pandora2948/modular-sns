import { menuKeys } from './constant';

// 분기 5개 이상일 경우 switch 교체
export const processQuarterOnDropDownMenu = ({ key, postId, updateCb, deleteCb }) => {
  if (key === menuKeys.editPost) updateCb(postId);
  if (key === menuKeys.deletePost) deleteCb(postId);
};
