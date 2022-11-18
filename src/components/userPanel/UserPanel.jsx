import { UserOutlined } from '@ant-design/icons';
import { UserService } from '../../api/services';

const UserPanel = () => {
  const userStat = UserService.getLoginedUser().then((v) => v);
  console.log(userStat);
  return (
    <>
      <section className="bg-amber-100 my-6">
        <UserOutlined size="32px" />
      </section>
    </>
  );
};

export default UserPanel;
