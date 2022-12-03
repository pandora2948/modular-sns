import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import stylePropType from 'react-style-proptype';
import { invertColor, isAlphabet } from 'utils';

const getProfileColor = (char) => {
  if (!isAlphabet(char)) {
    return {
      color: invertColor('#89CFF0'),
      backgroundColor: '#89CFF0',
    };
  }

  const ascii = char.charCodeAt(0);
  const doubleDigit = ascii - 23; // 'z' is 122
  const backgroundColor = `#${Math.floor((doubleDigit / 100) * 16777215).toString(16)}`;
  const color = invertColor(backgroundColor);

  return { color, backgroundColor };
};

const sizeClassNamesDict = {
  s: 'text-lg w-8 h-8',
  m: 'text-2xl w-10 h-10',
  l: 'text-5xl w-20 h-20',
};

const UserIcon = ({ username, size = 's', style }) => {
  const sizeClassNames = sizeClassNamesDict[size] ?? '';
  const firstAlphabetOfUsername = username?.match(/[a-zA-Z]/)?.[0];
  const { color, backgroundColor } = getProfileColor(firstAlphabetOfUsername);

  return (
    <div
      className={`rounded-full flex justify-center items-center ${sizeClassNames}`}
      style={{
        ...style,
        color,
        backgroundColor,
      }}
    >
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
