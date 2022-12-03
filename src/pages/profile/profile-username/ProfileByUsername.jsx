import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import { useParams } from 'react-router';
import TargetFollowButton from './TargetFollowButton';
import useFetchUser from './hooks/useFetchUser';

const ProfileByUsername = () => {
  const { username } = useParams();
  const [user] = useFetchUser(username);

  return (
    <AppLayout>
      <UserPanel userStatus={user} followComponent={<TargetFollowButton username={username} />} />
    </AppLayout>
  );
};

export default ProfileByUsername;
