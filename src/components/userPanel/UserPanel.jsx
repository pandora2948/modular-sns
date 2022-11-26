import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import shortid from 'shortid';
import { UserService } from '../../api/services';
import { loginInfoState } from '../auth/SignInForm';
import ProfileStat from './ProfileStat';
import UserConfigDropdown from './UserConfigDropdown';
import UserIcon from './UserIcon';

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

const UserPanel = () => {
  const loginInfo = useRecoilValue(loginInfoState);
  const [userStat, setUserStat] = useState(userStatInitialData);

  useEffect(() => {
    UserService.getLoginedUser()
      .then((userStat) => setUserStat(userStat))
      .catch((e) => message.error(e));
  }, []);

  const contents = [
    { title: '팔로잉', count: userStat.allFollowingCount },
    { title: '팔로워', count: userStat.allFollowerCount },
  ];

  const userName = loginInfo.userName;

  return (
    <>
      <section className="bg-gray-200 my-8 px-8 pt-8 py-3">
        <div className="flex flex-col items-start">
          <div className="flex flex-row justify-end align-middle w-full relative">
            <UserIcon userName={userName} size="l" />
            <UserConfigDropdown />
          </div>
          <span className="font-bold text-lg mt-4">{userName}</span>
        </div>
        <div className="flex mt-2">
          {contents.map((v) => {
            return <ProfileStat key={shortid.generate()} title={v.title} count={v.count} />;
          })}
        </div>
      </section>
    </>
  );
};

export default UserPanel;
