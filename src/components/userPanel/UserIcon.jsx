import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import stylePropType from 'react-style-proptype';

const sizeClassNamesDict = {
  s: 'text-lg w-8 h-8',
  m: 'text-2xl w-10 h-10',
  l: 'text-5xl w-20 h-20',
};

const UserIcon = ({ username, size = 's', style }) => {
  const sizeClassNames = sizeClassNamesDict[size] ?? '';

  return (
    <div className={`bg-blue-500 rounded-full flex justify-center items-center ${sizeClassNames}`} style={style}>
      {!username ? <UserOutlined /> : <span>{username.at(0).toUpperCase()}</span>}
    </div>
  );
};

UserIcon.propTypes = {
  username: PropTypes.string,
  size: PropTypes.string,
  style: stylePropType,
};

export default UserIcon;
