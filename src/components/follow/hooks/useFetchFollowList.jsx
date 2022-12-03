import { useEffect, useState } from 'react';
import { UserService } from '../../../api/services';
import { handleErrorByAntdMessage } from '../../../utils/handler';

const useFetchFollowList = () => {
  const [followUsernameList, setFollowUsernameList] = useState([]);

  useEffect(() => {
    UserService.getFollowerUserList()
      .then((followUsers) => setFollowUsernameList(followUsers))
      .catch(handleErrorByAntdMessage);
  }, []);

  return [followUsernameList, setFollowUsernameList];
};

export default useFetchFollowList;
