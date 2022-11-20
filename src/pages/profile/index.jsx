import EmptyFeed from '../../components/empty/EmptyFeed';
import UserPanel from '../../components/userPanel/UserPanel';
import AppLayout from '../../layouts/AppLayout';

const Profile = () => {
  return (
    <AppLayout>
      <UserPanel />
      <EmptyFeed />
    </AppLayout>
  );
};

export default Profile;
