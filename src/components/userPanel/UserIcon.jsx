import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

const sizeClassNamesDict = {
  s: 'text-lg w-8 h-8',
  m: 'text-2xl w-10 h-10',
  l: 'text-5xl w-20 h-20',
};

const UserIcon = ({ userName, size = 's' }) => {
  const sizeClassNames = sizeClassNamesDict[size] ?? '';

  return (
    <div
      className={`absolute left-0 bottom-0 bg-blue-500 rounded-full flex justify-center items-center ${sizeClassNames}`}
    >
      {!userName ? <UserOutlined /> : <span>{userName.at(0).toUpperCase()}</span>}
    </div>
  );
};

UserIcon.propTypes = {
  userName: PropTypes.string,
  size: PropTypes.string,
};

export default UserIcon;
