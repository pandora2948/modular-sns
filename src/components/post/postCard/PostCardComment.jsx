import { memo } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

const PostCardComment = ({ comment }) => (
  <div className="flex items-center gap-x-3">
    <div className="flex gap-x-1 items-center">
      <UserOutlined />
      <Text>{comment.userInfo.username}</Text>
    </div>
    <Text>{comment.textContent}</Text>
  </div>
);

PostCardComment.propTypes = {
  comment: PropTypes.shape({
    commentId: PropTypes.number.isRequired,
    articleId: PropTypes.number.isRequired,
    replyUserId: PropTypes.number.isRequired,
    textContent: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
      userId: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default memo(PostCardComment);
