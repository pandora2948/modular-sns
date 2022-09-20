import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import shortid from 'shortid';

const { Text } = Typography;

export const Comment = ({ comment }) => (
  <div className="flex items-center gap-x-3" key={shortid.generate()}>
    <div className="flex gap-x-1 items-center">
      <UserOutlined />
      <Text>{ comment.writer }</Text>
    </div>
    <Text>{ comment.content }</Text>
  </div>
);

export const CommentList = ({ comments }) => (
  <section className="flex flex-col justify-center p-3">
    {
      comments?.map(comment => (
        <Comment comment={comment} />
      ))
    }
  </section>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer:PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

Comment.propTypes = {
  comment: PropTypes.shape({
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
