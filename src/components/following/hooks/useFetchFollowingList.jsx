import { useEffect, useState } from 'react';
import { UserService } from '../../../api/services';
import { handleErrorByAntdMessage } from '../../../utils/handler';

const useFetchFollowingList = () => {
  const [followUsernameList, setFollowUsernameList] = useState([]);

  useEffect(() => {
    UserService.getFollowingUserList()
      .then((followingUsers) => setFollowUsernameList(followingUsers))
      .catch(handleErrorByAntdMessage);
  }, []);

  return [followUsernameList, setFollowUsernameList];
};

export default useFetchFollowingList;
