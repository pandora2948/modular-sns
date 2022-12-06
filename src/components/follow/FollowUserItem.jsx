import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import { UserService } from 'api/services';
import UserIcon from 'components/userPanel/UserIcon';
import { useRecoilState, useRecoilValue } from 'recoil';
import atomStore from 'store/atom';
import useFetchCheckIsFollow from './hooks/useFetchCheckIsFollow';

const FollowUserItem = ({ username, realname }) => {
  const navigate = useNavigate();
  const { userInfo } = useRecoilValue(atomStore.userProfileInfo);
  const [users, setUsers] = useRecoilState(atomStore.userProfileInfo);
  const { isFollow, setIsFollow } = useFetchCheckIsFollow({ username });
  const me = useRecoilValue(atomStore.meAtom);
  const isMe = me.username === username;
  const [messageApi, contextHolder] = message.useMessage();
  const followButtonMessage = me.userId === userInfo.userId ? '맞팔로우' : '팔로우';

  const onClickRemoveFollow = async () => {
    try {
      await UserService.removeFollow({ username });
      if (isMe) {
        setUsers({ ...users, allFollowerCount: users.allFollowerCount - 1 });
      }
      setIsFollow(false);
    } catch (err) {
      messageApi.error(err.message);
    }
  };
  const onClickAddFollowing = async () => {
    try {
      await UserService.addFollow({ username });
      if (isMe) {
        setUsers({ ...users, allFollowerCount: users.allFollowerCount + 1 });
      }
      setIsFollow(true);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const onClickUserInfo = () => navigate(`/profile/${username}`);

  return (
    <li className="w-full flex justify-between">
      {contextHolder}
      <Button type="text" onClick={onClickUserInfo} className="flex items-center gap-1 p-0 h-fit">
        <UserIcon username={username} realname={realname} />
        <div className="flex flex-col">
          <span className="ml-2.5 font-semibold text-base">@{username}</span>
          <span className="ml-2.5 text-sm text-slate-500 font-light">{realname}</span>
        </div>
      </Button>
      {isFollow && !isMe && <Button onClick={onClickRemoveFollow}>팔로우 취소</Button>}
      {!isFollow && !isMe && <Button onClick={onClickAddFollowing}>{followButtonMessage}</Button>}
    </li>
  );
};

FollowUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  realname: PropTypes.string.isRequired,
};

export default FollowUserItem;
