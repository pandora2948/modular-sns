import PropTypes from 'prop-types';
import { Modal } from 'antd';
import shortid from 'shortid';
import FollowUserItem from './FollowUserItem';
import useFetchFollowList from './hooks/useFetchFollowList';

const FollowInfoModal = ({ isShow, handleOpen, handleClose }) => {
  const [followUsers] = useFetchFollowList();

  return (
    <Modal title="팔로우 현황" open={isShow} onOk={handleOpen} onCancel={handleClose}>
      {followUsers.map(({ username, realname }) => (
        <FollowUserItem username={username} realname={realname} key={shortid()} />
      ))}
    </Modal>
  );
};

FollowInfoModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FollowInfoModal;
