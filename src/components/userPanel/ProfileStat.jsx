import PropTypes from 'prop-types';
import { Button } from 'antd';

const ProfileStat = ({ title, count }) => {
  return (
    <Button type="text" size="small" className="flex align-middle leading-normal p-0 mr-1">
      <span className="text-base text-center font-bold mr-1 align-middle">{count}</span>
      <span className="text-base align-middle">{title}</span>
    </Button>
  );
};

ProfileStat.propTypes = { title: PropTypes.string, count: PropTypes.number };
export default ProfileStat;
