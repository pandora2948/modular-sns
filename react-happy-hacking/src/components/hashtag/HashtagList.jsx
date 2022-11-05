import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Hashtag } from '.';

const HashtagList = ({ tags }) => (
  <>
    {tags.map((tag) => (
      <Hashtag key={shortid.generate()} tag={tag} />
    ))}
  </>
);

HashtagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HashtagList;
