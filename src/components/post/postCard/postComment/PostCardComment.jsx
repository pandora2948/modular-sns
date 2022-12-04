import { memo } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import PostCommentsDropdown from 'components/post/postCard/postComment/postCommentDropdown/PostCommentsDropdown';
import { useRecoilValue } from 'recoil';
import { meAtom } from 'store/atom/user';

const { Text } = Typography;

const PostCardComment = ({ comment }) => {
  const me = useRecoilValue(meAtom);

  return (
    <div className="flex items-center gap-x-3 justify-between">
      <div className="flex gap-x-2">
        <div className="flex gap-x-1 items-center">
          <UserOutlined />
          <Text className="text-bold font-bold">{comment.userInfo.username}</Text>
        </div>
        <Text>{comment.textContent}</Text>
      </div>
      {me.userId === comment.userInfo.userId && <PostCommentsDropdown commentId={comment.commentId} />}
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
};

export default memo(PostCardComment);
