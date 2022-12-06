import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PostsService } from 'api/services';
import PostCardCommentBox from 'components/post/postCard/postComment/PostCardCommentBox';
import PostCardCommentList from 'components/post/postCard/postComment/PostCardCommentList';

const LIKE_COLOR = 'text-pink-600';
const NOT_LIKE_COLOR = 'text-gray-600';

const PostCardFooter = ({ footerData: { likeCount, comments, likeUp, postId } }) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const [likedButtonState, setLikedButtonState] = useState({
    isLiked: likeUp,
    likeCount,
    color: likeUp ? LIKE_COLOR : NOT_LIKE_COLOR,
  });
  const [postComments, setPostComments] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickCommentBox = useCallback(() => {
    setIsOpenCommentBox((prev) => !prev);
  }, []);

  const handleClickLikeBox = useCallback(async () => {
    if (likedButtonState.isLiked) {
      try {
        const updatedLikeCount = await PostsService.removeLikeToPost({ postId });
        setLikedButtonState(() => ({
          isLiked: false,
          likeCount: updatedLikeCount,
          color: NOT_LIKE_COLOR,
        }));
      } catch (err) {
        messageApi.error(err.message);
      }
    } else {
      try {
        const updatedLikeCount = await PostsService.addLikeToPost({ postId }).catch((err) =>
          messageApi.error(err.message)
        );
        setLikedButtonState(() => ({
          isLiked: true,
          likeCount: updatedLikeCount,
          color: LIKE_COLOR,
        }));
      } catch (err) {
        messageApi.error(err.message);
      }
    }
  }, [likedButtonState.isLiked, messageApi, postId]);

  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  return (
    <>
      {contextHolder}
      <footer className="grid grid-cols-2 mt-5">
        <Button type="text" className="border-0 bg-transparent text-gray-600" onClick={handleClickCommentBox}>
          <CommentOutlined className="text-xl" />
          <span>{comments.length}</span>
        </Button>
        <Button
          type="text"
          className={`border-0 bg-transparent ${likedButtonState.color}`}
          onClick={handleClickLikeBox}
        >
          <LikeOutlined className="text-xl" />
          <span>{likedButtonState.likeCount}</span>
        </Button>
      </footer>

      <PostCardCommentBox postId={postId} handleComments={setPostComments} open={isOpenCommentBox} />
      <PostCardCommentList postId={postId} handleComments={setPostComments} comments={postComments} />
    </>
  );
};

PostCardFooter.propTypes = {
  footerData: PropTypes.shape({
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
        }).isRequired,
      }).isRequired
    ),
    likeUp: PropTypes.bool.isRequired,
    likeCount: PropTypes.number.isRequired,
  }),
};
export default PostCardFooter;
