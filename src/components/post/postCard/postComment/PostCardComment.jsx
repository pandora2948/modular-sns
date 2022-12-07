import { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import PostCommentsDropdown from 'components/post/postCard/postComment/postCommentDropdown/PostCommentsDropdown';
import { useRecoilValue } from 'recoil';
import { meAtom } from 'store/atom/user';
import UserIcon from '../../../userPanel/UserIcon';

const { Text } = Typography;

const PostCardComment = ({ comment, postId, handleComments }) => {
  const me = useRecoilValue(meAtom);
  const {
    userInfo: { username, realname },
  } = comment;

  return (
    <div className="flex items-center gap-x-3 justify-between mb-2">
      <div className="flex gap-x-2 items-center">
        <div className="flex gap-x-1 items-center">
          <UserIcon realname={realname} username={username} />
          <Text className="text-bold font-bold ml-0.5">{comment.userInfo.realname}</Text>
        </div>
        <Text>{comment.textContent}</Text>
      </div>
      {me.userId === comment.userInfo.userId && (
        <PostCommentsDropdown
          postId={postId}
          commentId={comment.commentId}
          ownerId={comment.userInfo.userId}
          handleComments={handleComments}
        />
      )}
    </div>
  );
};
PostCardComment.propTypes = {
  comment: PropTypes.shape({
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
  }).isRequired,
  postId: PropTypes.number.isRequired,
  handleComments: PropTypes.func.isRequired,
};

export default memo(PostCardComment);
