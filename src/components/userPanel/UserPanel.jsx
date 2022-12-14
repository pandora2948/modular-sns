import PropTypes from 'prop-types';
import FollowInfoModal from 'components/follow/FollowInfoModal';
import FollowingInfoModal from 'components/following/FollowingInfoModal';
import { useModal } from 'hooks/useModal';
import { useRecoilValue } from 'recoil';
import atomStore from 'store/atom';
import ProfileStat from './ProfileStat';
import UserConfigDropdown from './UserConfigDropdown';
import UserIcon from './UserIcon';

const UserPanel = ({ followComponent }) => {
  const userProfileInfo = useRecoilValue(atomStore.userProfileInfo);
  const { allFollowingCount, allFollowerCount, userInfo } = userProfileInfo;

  // Modal status
  const { isModalOpen: isFollowModalOpen, openModal: openFollowModal, closeModal: closeFollowModal } = useModal();
  const {
    isModalOpen: isFollowingModalOpen,
    openModal: openFollowingModal,
    closeModal: closeFollowingModal,
  } = useModal();

  if (!userProfileInfo) return null;

  return (
    <>
      <section className="relative pt-[5.5rem]">
        <section className="absolute top-0 bg-gray-300 w-full h-32"></section>
        <article className="relative px-5">
          <section className="flex justify-between items-end">
            <UserIcon size="l" username={userInfo.username} realname={userInfo.realname} />
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
              <ProfileStat title="팔로우 중" count={allFollowingCount} onClick={openFollowingModal} />
              <ProfileStat title="팔로워" count={allFollowerCount} onClick={openFollowModal} />
            </section>
            {followComponent}
          </section>
        </article>
      </section>
      <FollowInfoModal handleClose={closeFollowModal} isShow={isFollowModalOpen} />
      <FollowingInfoModal handleClose={closeFollowingModal} isShow={isFollowingModalOpen} />
    </>
  );
};

UserPanel.propTypes = {
  followComponent: PropTypes.element,
};

export default UserPanel;
