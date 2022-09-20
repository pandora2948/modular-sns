import PropTypes from 'prop-types';

export const InteractButton = ({ children, onClick }) => (
  <button
    type="button"
    className="p-2 w-full flex-all bg-white hover:bg-gray-100"
    onClick={onClick}
  >
    { children }
  </button>
);

InteractButton.propTypes = {
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

