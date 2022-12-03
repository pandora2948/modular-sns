import PropTypes from 'prop-types';
import { Modal } from 'antd';
import useFetchFollowList from './hooks/useFetchFollowList';

const FollowInfoModal = ({ isShow, handleOpen, handleClose }) => {
  const [followUsernameList] = useFetchFollowList();
  console.log(followUsernameList);

  return (
    <Modal title="팔로우 현황" open={isShow} onOk={handleOpen} onCancel={handleClose}>
      {followUsernameList.map()}
    </Modal>
  );
};

FollowInfoModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FollowInfoModal;
