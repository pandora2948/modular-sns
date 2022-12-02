import { menuKeys } from './constant';

// 분기 5개 이상일 경우 switch 교체
export const processQuarterOnDropDownMenu = ({ key, postId, updatePost, deletePost }) => {
  if (key === menuKeys.editPost) updatePost(postId);
  if (key === menuKeys.deletePost) deletePost(postId);
};
