import PropTypes from 'prop-types';
import { Button } from 'antd';

const PostCardButton = ({ children, onClick }) => (
  <Button className="p-2 w-full flex-all" onClick={onClick}>
    {children}
  </Button>
);

PostCardButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PostCardButton;
