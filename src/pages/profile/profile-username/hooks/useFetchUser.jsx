import { UserService } from 'api/services';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { handleErrorByAntdMessage } from 'utils/handler';

const useFetchUser = (username) => {
  const [userInfo, setUserInfo] = useRecoilState(atomStore.userInfoByUsernameAtom);

  useDidMountEffect(() => {
    UserService.getUserByUsername({ username })
      .then((user) => setUserInfo(user))
      .catch(handleErrorByAntdMessage);
  });

  return [userInfo, setUserInfo];
};

export default useFetchUser;
