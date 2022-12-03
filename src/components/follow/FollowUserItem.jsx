import PropTypes from 'prop-types';
import { Button } from 'antd';

const FollowUserItem = ({ username }) => {
  return (
    <li>
      <span>{username}</span>
      <Button>팔로우 취소</Button>
    </li>
  );
};

FollowUserItem.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FollowUserItem;
