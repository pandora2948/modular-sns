import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

const menuKeys = {
  profileConfig: '1',
  passwordConfig: '2',
};

const menuItems = [
  { label: '프로필 변경', key: menuKeys.profileConfig },
  { type: 'divider' },
  { label: '비밀번호 변경', key: menuKeys.passwordConfig },
];

const UserConfigDropdown = () => {
  const navigate = useNavigate();
  const onProfileSettingClicked = useCallback(
    ({ key }) => {
      switch (key) {
        case menuKeys.profileConfig: {
          navigate('/profile/user-config');
          return;
        }

        case menuKeys.passwordConfig: {
          navigate('/profile/password-config');
          return;
        }

        default:
          return;
      }
    },
    [navigate]
  );

  return (
    <Dropdown menu={{ items: menuItems, onClick: onProfileSettingClicked }}>
      <Button type="text" icon={<SettingOutlined />} size="large" />
    </Dropdown>
  );
};

export default UserConfigDropdown;
