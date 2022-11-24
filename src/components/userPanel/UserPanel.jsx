import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import shortid from 'shortid';
import { UserService } from '../../api/services';
import { userDataState } from '../auth/SignInForm';
import ProfileStat from './ProfileStat';
import UserIcon from './UserIcon';

const UserPanel = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);
  const handleProfileChange = useCallback(() => {
    navigate('/profile/config');
  }, [navigate]);

  const userStat = useEffect(() => {
    UserService.getLoginedUser();
    return;
  });

  const contents = [
    { title: '팔로잉', count: '31' },
    { title: '팔로워', count: '12' },
  ];

  log.info('userStat', userStat);
  console.log(userStat);

  const userName = userData.userName;

  return (
    <>
      <section className="bg-gray-200 my-8 px-8 pt-8 py-3">
        <div className="flex flex-col items-start">
          <div className="flex flex-row justify-end align-middle w-full relative">
            <UserIcon userName={userName} />
            <Button shape="round" size="large" className="text-sm" onClick={handleProfileChange}>
              프로필 설정
            </Button>
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
