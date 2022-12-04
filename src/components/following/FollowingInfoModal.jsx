import PropTypes from 'prop-types';
import { Modal } from 'antd';
import shortid from 'shortid';
import FollowingUserItem from './FollowingUserItem';
import useFetchFollowingList from './hooks/useFetchFollowingList';

const FollowingInfoModal = ({ isShow, handleOpen, handleClose }) => {
  const [followingUsers] = useFetchFollowingList();

  return (
    <Modal title="팔로잉 현황" open={isShow} onOk={handleClose} onCancel={handleClose}>
      {followingUsers.map(({ username, realname }) => (
        <FollowingUserItem username={username} realname={realname} key={shortid()} />
      ))}
    </Modal>
  );
};

FollowingInfoModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FollowingInfoModal;
