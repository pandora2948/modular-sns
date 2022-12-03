import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import { UserService } from '../../api/services';
import UserIcon from '../userPanel/UserIcon';
import useFetchCheckIsFollow from './hooks/useFetchCheckIsFollow';

const FollowUserItem = ({ username, realname }) => {
  const { isFollow, setIsFollow } = useFetchCheckIsFollow({ username });
  const onClickRemoveFollow = async () => {
    try {
      await UserService.removeFollow({ username });
      setIsFollow(false);
    } catch (e) {
      message.error(e);
    }
  };
  const onClickAddFollowing = async () => {
    try {
      await UserService.addFollow({ username });
      setIsFollow(true);
    } catch (e) {
      message.error(e);
    }
  };

  return (
    <li className="w-full flex justify-between">
      <div className="flex items-center">
        <UserIcon username={username} />
        <div className="flex flex-col">
          <span className="ml-2.5 font-semibold text-base">{username}</span>
          <span className="ml-2.5 text-sm text-slate-500 font-light">{realname}</span>
        </div>
      </div>
      {isFollow && <Button onClick={onClickRemoveFollow}>팔로우 취소</Button>}
      {!isFollow && <Button onClick={onClickAddFollowing}>맞팔로우</Button>}
    </li>
  );
};

FollowUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  realname: PropTypes.string.isRequired,
};

export default FollowUserItem;
