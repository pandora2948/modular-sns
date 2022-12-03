import { useState } from 'react';
import { UserService } from '../../../../api/services';
import { useDidMountEffect } from '../../../../hooks/useDidMountEffect';
import { handleErrorByAntdMessage } from '../../../../utils/handler';

const useFetchUser = (username) => {
  const [user, setUser] = useState({});

  useDidMountEffect(() => {
    UserService.getUserByUsername({ username })
      .then((user) => setUser(user))
      .catch(handleErrorByAntdMessage);
  });

  return [user, setUser];
};

export default useFetchUser;
