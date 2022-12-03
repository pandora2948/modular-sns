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
      <section className="relative pt-[5.5rem]">
        <section className="absolute top-0 bg-gray-300 w-full h-32"></section>
        <article className="relative px-5">
          <section className="flex justify-between items-end">
            <UserIcon username={userInfo.username} size="l" />
            <UserConfigDropdown />
          </section>
          <section>
            <section className="my-2">
              <p className="text-xl font-semibold text-gray-700 mb-0">{userInfo.realname}</p>
              <p className="text-gray-600 mb-0">@{userInfo.username}</p>
            </section>
            {/*<section>*/}
            {/*  <CalendarOutlined />*/}
            {/*  <span>가입일 {userInfo.createAt}</span>*/}
            {/*</section>*/}
            <section className="flex gap-2">
              <ProfileStat title="팔로우 중" count={allFollowingCount} onClick={openFollowModal} />
              <ProfileStat title="팔로워" count={allFollowerCount} onClick={openFollowModal} />
            </section>
            {followComponent}
          </section>
        </article>
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
      realname: PropTypes.string.isRequired,
    }),
  }),
  followComponent: PropTypes.element,
};

export default UserPanel;
