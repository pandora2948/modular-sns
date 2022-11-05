import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Typography } from 'antd';

const { Text } = Typography;

const ArticleHashtags = ({ tags }) => (
  <>
    {tags.map(tag =>
      <Text className="text-sky-500 pr-0.5" key={shortid.generate()}>
        { tag }
      </Text>
    )
    }
  </>
);

ArticleHashtags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArticleHashtags;
