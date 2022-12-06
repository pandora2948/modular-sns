import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import { UserService } from 'api/services';
import useFetchCheckIsFollow from 'components/follow/hooks/useFetchCheckIsFollow';
import UserIcon from 'components/userPanel/UserIcon';
import { useRecoilState, useRecoilValue } from 'recoil';
import atomStore from 'store/atom';

const FollowingUserItem = ({ username, realname }) => {
  const { userInfo } = useRecoilValue(atomStore.userProfileInfo);
  const [users, setUsers] = useRecoilState(atomStore.userProfileInfo);
  const { isFollow, setIsFollow } = useFetchCheckIsFollow({ username });
  const me = useRecoilValue(atomStore.meAtom);
  const isMe = me.username === username;
  const isProfileMe = me.userId === userInfo.userId;
  const [messageApi, contextHolder] = message.useMessage();
  const followButtonMessage = isProfileMe ? '맞팔로우' : '팔로우';

  const onClickAction = async (apiCb, dispatcherCb, isFollow) => {
    try {
      await apiCb();
      if (isProfileMe) dispatcherCb();
      setIsFollow(isFollow);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const onClickRemoveFollow = () =>
    onClickAction(
      () => UserService.removeFollow({ username }),
      () => setUsers({ ...users, allFollowerCount: users.allFollowerCount - 1 }),
      false
    );

  const onClickAddFollowing = () =>
    onClickAction(
      () => UserService.addFollow({ username }),
      () => setUsers({ ...users, allFollowerCount: users.allFollowerCount + 1 }),
      true
    );

  return (
    <>
      {contextHolder}
      <li className="w-full flex justify-between">
        <div className="flex items-center">
          <UserIcon username={username} realname={realname} />
          <div className="flex flex-col">
            <span className="ml-2.5 font-semibold text-base">@{username}</span>
            <span className="ml-2.5 text-sm text-slate-500 font-light">{realname}</span>
          </div>
        </div>
        {isFollow && !isMe && <Button onClick={onClickRemoveFollow}>팔로우 취소</Button>}
        {!isFollow && !isMe && <Button onClick={onClickAddFollowing}>{followButtonMessage}</Button>}
      </li>
    </>
  );
};

FollowingUserItem.propTypes = {
  username: PropTypes.string.isRequired,
  realname: PropTypes.string.isRequired,
};

export default FollowingUserItem;
