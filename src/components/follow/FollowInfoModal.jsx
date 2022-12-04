import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import shortid from 'shortid';
import atomStore from '../../store/atom';
import FollowUserItem from './FollowUserItem';
import useFetchFollowList from './hooks/useFetchFollowList';

const FollowInfoModal = ({ isShow, handleClose }) => {
  const userProfileInfo = useRecoilValue(atomStore.userProfileInfo);
  const [followUsers, _, refresh] = useFetchFollowList(userProfileInfo?.userInfo.username);

  useEffect(() => {
    refresh();
  }, [isShow, refresh]);

  return (
    <Modal title="팔로우 현황" open={isShow} onOk={handleClose} onCancel={handleClose}>
      {followUsers.map(({ username, realname }) => (
        <FollowUserItem username={username} realname={realname} key={shortid()} />
      ))}
    </Modal>
  );
};

FollowInfoModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FollowInfoModal;
