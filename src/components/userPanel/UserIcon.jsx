import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

const UserIcon = ({ userName, size = 's' }) => {
  const [iconSize, setIconSize] = useState(
    'absolute left-0 bottom-0 bg-blue-500 rounded-full flex justify-center items-center'
  );
  useEffect(() => {
    switch (size) {
      case 's':
        setIconSize((prv) => prv + ' text-lg w-8 h-8');
        break;

      case 'm':
        setIconSize((prv) => prv + ' text-2xl w-10 h-10');
        break;

      case 'l':
        setIconSize((prv) => prv + ' text-5xl w-20 h-20');
        break;

      default:
        break;
    }
  }, [size]);

  return <div className={iconSize}>{!userName ? <UserOutlined /> : <span>{userName.at(0).toUpperCase()}</span>}</div>;
};

UserIcon.propTypes = { userName: PropTypes.string, size: PropTypes.string };

export default UserIcon;
