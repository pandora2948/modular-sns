import { useState } from 'react';
import { UserService } from 'api/services';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import { handleErrorByAntdMessage } from 'utils/handler';

const userStatInitialData = {
  allFollowerCount: 0,
  allFollowingCount: 0,
  allGivenLikeCount: 0,
  allPostCount: 0,
  userInfo: {
    userId: 0,
    email: '',
    username: '',
  },
};

const useFetchUser = (username) => {
  const [user, setUser] = useState(userStatInitialData);

  useDidMountEffect(() => {
    UserService.getUserByUsername({ username })
      .then((user) => setUser(user))
      .catch(handleErrorByAntdMessage);
  });

  return [user, setUser];
};

export default useFetchUser;
