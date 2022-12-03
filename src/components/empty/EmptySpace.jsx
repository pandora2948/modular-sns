import PropTypes from 'prop-types';

const EmptySpace = ({ height = 10 }) => {
  return <section style={{ height }}></section>;
};

EmptySpace.propTypes = {
  height: PropTypes.number,
};

export default EmptySpace;
