import { PostsService } from 'api/services';

export const deletePostOnPostEditDropdown = ({ posts, deletePostId, successCb, failureCb }) =>
  PostsService.deletePost({ postId: deletePostId })
    .then(() => {
      const idFilteredPosts = posts.filter(({ postId }) => postId !== deletePostId);
      successCb(idFilteredPosts);
    })
    .catch(failureCb);
