import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Typography } from 'antd';

const { Text } = Typography;

export const Hashtags = ({ tags }) => (
  <>
    {tags.map(tag =>
      <Text className="text-sky-500 pr-0.5" key={shortid.generate()}>
        { tag }
      </Text>
    )
    }
  </>
);

Hashtags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
