import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import atomStore from '../../../store/atom';
import TargetFollowButton from './TargetFollowButton';
import useFetchUser from './hooks/useFetchUser';

const ProfileByUsername = () => {
  const { username } = useParams();
  const [user] = useFetchUser(username);
  const me = useRecoilValue(atomStore.meAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const isMe = user?.userInfo.userId === me?.userId;
    if (isMe) navigate('/profile');
  }, [user, me, navigate]);

  return (
    <AppLayout>
      <UserPanel userStatus={user} followComponent={<TargetFollowButton username={username} />} />
    </AppLayout>
  );
};

export default ProfileByUsername;
