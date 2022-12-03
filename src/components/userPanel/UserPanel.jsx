import PropTypes from 'prop-types';
import { useModal } from '../../hooks/useModal';
import FollowInfoModal from '../follow/FollowInfoModal';
import ProfileStat from './ProfileStat';
import UserConfigDropdown from './UserConfigDropdown';
import UserIcon from './UserIcon';

const UserPanel = ({ userStatus, followComponent }) => {
  const { allFollowingCount, allFollowerCount, userInfo, allGivenLikeCount, allPostCount } = userStatus;
  const { isModalOpen: isFollowModalOpen, openModal: openFollowModal, closeModal: closeFollowModal } = useModal();
  const { isModalOpen: isFollowingModalOpen } = useModal();

  return (
    <>
      <section className="bg-gray-200 my-8 px-8 pt-8 py-3">
        <div className="flex flex-col items-start">
          <div className="flex flex-row justify-end align-middle w-full relative">
            <UserIcon
              username={userInfo.username}
              size="l"
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
              }}
            />
            <UserConfigDropdown />
          </div>
          <span className="font-semibold text-2xl pt-2">{userInfo.username}</span>
          <div className="flex mt-2">
            <ProfileStat title="팔로잉" count={allFollowingCount} onClick={openFollowModal} />
            <ProfileStat title="팔로워" count={allFollowerCount} onClick={openFollowModal} />
          </div>
          {followComponent}
        </div>
      </section>
      <FollowInfoModal handleOpen={openFollowModal} handleClose={closeFollowModal} isShow={isFollowModalOpen} />
    </>
  );
};

UserPanel.propTypes = {
  userStatus: PropTypes.shape({
    allFollowerCount: PropTypes.number.isRequired,
    allFollowingCount: PropTypes.number.isRequired,
    allGivenLikeCount: PropTypes.number.isRequired,
    allPostCount: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      userId: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
  followComponent: PropTypes.element,
};

export default UserPanel;
