import { useEffect, useState } from 'react';
import { UserService } from '../../../api/services';
import { handleErrorByAntdMessage } from '../../../utils/handler';

const useFetchFollowList = () => {
  const [followUsernameList, setFollowUsernameList] = useState([]);

  useEffect(() => {
    UserService.getFollowerUsernameList()
      .then((usernameList) => setFollowUsernameList(usernameList))
      .catch(handleErrorByAntdMessage);
  }, []);

  return [followUsernameList, setFollowUsernameList];
};

export default useFetchFollowList;
