import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserService } from '../../api/services';
import atomStore from '../../store/atom';
import useFetchCheckIsFollow from '../follow/hooks/useFetchCheckIsFollow';
import UserIcon from '../userPanel/UserIcon';

const FollowingUserItem = ({ username, realname }) => {
  const [users, setUsers] = useRecoilState(atomStore.userProfileInfo);
  const { isFollow, setIsFollow } = useFetchCheckIsFollow({ username });
  const me = useRecoilValue(atomStore.meAtom);
  const isMe = me.username === username;

  const onClickRemoveFollow = async () => {
    try {
      await UserService.removeFollow({ username });
      setUsers({ ...users, allFollowerCount: users.allFollowerCount - 1 });
      setIsFollow(false);
    } catch (e) {
      alert(e);
    }
  };
  const onClickAddFollowing = async () => {
    try {
      await UserService.addFollow({ username });
      setUsers({ ...users, allFollowerCount: users.allFollowerCount + 1 });
      setIsFollow(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <li className="w-full flex justify-between">
      <div className="flex items-center">
        <UserIcon username={username} realname={realname} />
        <div className="flex flex-col">
          <span className="ml-2.5 font-semibold text-base">@{username}</span>
          <span className="ml-2.5 text-sm text-slate-500 font-light">{realname}</span>
        </div>
      </div>
      {isFollow && !isMe && <Button onClick={onClickRemoveFollow}>팔로우 취소</Button>}
      {!isFollow && !isMe && <Button onClick={onClickAddFollowing}>맞팔로우</Button>}
    </li>
  );
};

FollowingUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  realname: PropTypes.string.isRequired,
};

export default FollowingUserItem;
