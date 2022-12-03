import PropTypes from 'prop-types';
import { Button } from 'antd';

const PostCardButton = ({ children, onClick, type = 'text' }) => (
  <Button className="p-2 w-full flex-center" onClick={onClick} type={type}>
    {children}
  </Button>
);

PostCardButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default PostCardButton;
