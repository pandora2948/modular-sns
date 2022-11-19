import PropTypes from 'prop-types';
import { Typography } from 'antd';
import shortid from 'shortid';

const { Text } = Typography;

const PostCardHashtags = ({ tags }) => (
  <>
    {tags.map((tag) => (
      <Text className="text-sky-500 pr-0.5" key={shortid.generate()}>
        {tag}
      </Text>
    ))}
  </>
);

PostCardHashtags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PostCardHashtags;
