import { memo } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

const ArticleComment = ({ comment }) => (
  <div className="flex items-center gap-x-3">
    <div className="flex gap-x-1 items-center">
      <UserOutlined />
      <Text>{comment.writer}</Text>
    </div>
    <Text>{comment.content}</Text>
  </div>
);

ArticleComment.propTypes = {
  comment: PropTypes.shape({
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ArticleComment);
