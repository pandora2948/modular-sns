import { useCallback, useEffect, useState } from 'react';
import { UserService } from '../../../api/services';
import { handleErrorByAntdMessage } from '../../../utils/handler';

const useFetchFollowList = () => {
  const [followUsernameList, setFollowUsernameList] = useState([]);

  const refresh = useCallback(
    () =>
      UserService.getFollowerUserList()
        .then((followUsers) => setFollowUsernameList(followUsers))
        .catch(handleErrorByAntdMessage),
    []
  );

  useEffect(() => {
    UserService.getFollowerUserList()
      .then((followUsers) => setFollowUsernameList(followUsers))
      .catch(handleErrorByAntdMessage);
  }, []);

  return [followUsernameList, setFollowUsernameList, refresh];
};

export default useFetchFollowList;
