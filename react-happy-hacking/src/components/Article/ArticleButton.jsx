import PropTypes from 'prop-types';

const ArticleButton = ({ children, onClick }) => (
  <button
    type="button"
    className="p-2 w-full flex-all bg-white hover:bg-gray-100"
    onClick={onClick}
  >
    { children }
  </button>
);

ArticleButton.propTypes = {
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default ArticleButton;
