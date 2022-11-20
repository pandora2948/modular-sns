import PropTypes from 'prop-types';

const UserIcon = ({ userName }) => {
  return (
    <div className="absolute left-0 bottom-0 text-5xl bg-blue-500 rounded-full w-20 h-20 flex justify-center items-center">
      <span>{userName[0].toUpperCase()}</span>
    </div>
  );
};

UserIcon.propTypes = { userName: PropTypes.string };

export default UserIcon;
