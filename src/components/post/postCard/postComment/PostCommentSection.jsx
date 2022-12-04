import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostCardCommentBox from 'components/post/postCard/postComment/PostCardCommentBox';
import PostCardCommentList from 'components/post/postCard/postComment/PostCardCommentList';

const PostCommentSection = ({ open, postId, comments }) => {
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  return (
    <>
      <PostCardCommentBox postId={postId} open={open} handleComments={setPostComments} />
      <PostCardCommentList comments={postComments} />
    </>
  );
};

PostCommentSection.propTypes = {
  open: PropTypes.bool.isRequired,
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.number.isRequired,
      articleId: PropTypes.number.isRequired,
      replyUserId: PropTypes.any,
      textContent: PropTypes.string.isRequired,
      userInfo: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        realname: PropTypes.string.isRequired,
      }),
    }).isRequired
  ).isRequired,
};

export default PostCommentSection;
