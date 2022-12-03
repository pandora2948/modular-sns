import PropTypes from 'prop-types';
import { Button } from 'antd';
import { UserService } from 'api/services';
import UserIcon from 'components/userPanel/UserIcon';

const FollowUserItem = ({ username, realname }) => {
  const onClickRemoveFollowInfo = () => UserService.removeFollow({ username });

  return (
    <li className="w-full flex justify-between">
      <div className="flex items-center">
        <UserIcon username={username} realname={realname} />
        <span className="ml-2.5 font-semibold">{username}</span>
      </div>
      <Button onClick={onClickRemoveFollowInfo}>팔로우 취소</Button>
    </li>
  );
};

FollowUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  realname: PropTypes.string.isRequired,
};

export default FollowUserItem;
