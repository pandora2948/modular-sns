import PropTypes from 'prop-types';
import { Button } from 'antd';

const ProfileStat = ({ title, count, onClick }) => {
  return (
    <Button type="text" size="small" className="flex align-middle leading-normal p-0 mr-1" onClick={onClick}>
      <span className="text-base text-center font-bold mr-1 align-middle">{count}</span>
      <span className="text-base align-middle">{title}</span>
    </Button>
  );
};

ProfileStat.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProfileStat;
