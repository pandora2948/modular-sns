import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserService } from '../../../api/services';
import atomStore from '../../../store/atom';
import { handleErrorByAntdMessage } from '../../../utils/handler';

const useFetchFollowList = () => {
  const userProfileInfo = useRecoilValue(atomStore.userProfileInfo);
  const [followUsernameList, setFollowUsernameList] = useState([]);
  const username = userProfileInfo?.userInfo.username;

  const refresh = useCallback(() => {
    if (username) {
      UserService.getFollowerUserListByUsername({ username })
        .then((followUsers) => setFollowUsernameList(followUsers))
        .catch(handleErrorByAntdMessage);
    }
  }, [username]);

  useEffect(() => {
    UserService.getFollowingUserListByUsername({ username })
      .then((followUsers) => setFollowUsernameList(followUsers))
      .catch(handleErrorByAntdMessage);
  }, [username]);

  return [followUsernameList, setFollowUsernameList, refresh];
};

export default useFetchFollowList;
