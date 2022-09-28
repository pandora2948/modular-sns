import PropTypes from 'prop-types';
import { Hashtag } from '.';


export const HashtagList = ({ tags }) => (
  <>
    { tags.map(tag => <Hashtag tag={tag} />) }
  </>
);

HashtagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
