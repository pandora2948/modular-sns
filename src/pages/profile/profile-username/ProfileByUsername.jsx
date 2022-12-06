import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import atomStore from 'store/atom';
import TargetFollowButton from './TargetFollowButton';
import useFetchUser from './hooks/useFetchUser';

const ProfileByUsername = () => {
  const { username } = useParams();
  const [user] = useFetchUser(username);
  const me = useRecoilValue(atomStore.meAtom);
  const [userProfileInfo, setUserProfileInfo] = useRecoilState(atomStore.userProfileInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && me) {
      console.log({ user, me });
      const isMe = user.userInfo.userId === me.userId;
      if (isMe) navigate('/profile');
    }
  }, [user, me, navigate]);

  useEffect(() => {
    setUserProfileInfo(user);
  }, [setUserProfileInfo, user]);

  if (!user || !userProfileInfo) return null;

  return (
    <AppLayout>
      <PostCreateButton />

      <UserPanel followComponent={<TargetFollowButton username={username} />} />
    </AppLayout>
  );
};

export default ProfileByUsername;
