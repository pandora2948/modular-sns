import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { UserService } from '../../../api/services';
import atomStore from '../../../store/atom';
import { handleErrorByAntdMessage } from '../../../utils/handler';

const useFetchFollowingList = () => {
  const userProfileInfo = useRecoilValue(atomStore.userProfileInfo);
  const [followUsernameList, setFollowUsernameList] = useState([]);
  const username = userProfileInfo?.userInfo.username;

  useEffect(() => {
    if (username) {
      UserService.getFollowingUserListByUsername({ username })
        .then((followingUsers) => setFollowUsernameList(followingUsers))
        .catch(handleErrorByAntdMessage);
    }
  }, [username]);

  return [followUsernameList, setFollowUsernameList];
};

useFetchFollowingList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default useFetchFollowingList;
