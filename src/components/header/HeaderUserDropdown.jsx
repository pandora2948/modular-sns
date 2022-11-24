import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { AuthService } from 'api/services';
import { useSetRecoilState } from 'recoil';
import { token } from 'utils';
import { loginInfoState } from '../auth/SignInForm';

const MenuKey = {
  Profile: '1',
  SignOut: '2',
};

const menuItems = [
  {
    label: '프로필',
    key: MenuKey.Profile,
  },
  { type: 'divider' },
  {
    label: '로그아웃',
    key: MenuKey.SignOut,
  },
];

const HeaderUserDropdown = ({ isUser }) => {
  const navigate = useNavigate();
  const setloginInfo = useSetRecoilState(loginInfoState);

  const moveToSignInPage = useCallback(() => {
    navigate('/auth/sign-in');
  }, [navigate]);

  const handleDropDownClick = useCallback(
    async ({ key }) => {
      switch (key) {
        case MenuKey.Profile: {
          navigate('/profile');
          return;
        }
        case MenuKey.SignOut: {
          await AuthService.logout();
          setloginInfo(() => {});
          token.clear();
          moveToSignInPage();
          return;
        }
        default: {
          return;
        }
      }
    },
    [moveToSignInPage, navigate, setloginInfo]
  );

  if (!isUser) {
    return <Button shape="circle" icon={<UserOutlined color="black" />} onClick={moveToSignInPage} />;
  }

  return (
    <Dropdown menu={{ items: menuItems, onClick: handleDropDownClick }}>
      <Button shape="circle" icon={<UserOutlined color="black" />} />
    </Dropdown>
  );
};

HeaderUserDropdown.propTypes = {
  isUser: PropTypes.bool.isRequired,
};

export default HeaderUserDropdown;
