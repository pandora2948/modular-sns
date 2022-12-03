import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ProfileStat from './ProfileStat';
import UserConfigDropdown from './UserConfigDropdown';
import UserIcon from './UserIcon';

const UserPanel = ({ userStatus }) => {
  const [userStat] = useState(userStatus);

  const contents = [
    { title: '팔로잉', count: userStat.allFollowingCount },
    { title: '팔로워', count: userStat.allFollowerCount },
  ];

  return (
    <>
      <section className="bg-gray-200 my-8 px-8 pt-8 py-3">
        <div className="flex flex-col items-start">
          <div className="flex flex-row justify-end align-middle w-full relative">
            <UserIcon userName={userStat.userInfo.username} size="l" />
            <UserConfigDropdown />
          </div>
          <span className="font-bold text-lg mt-4">{userStat.userInfo.username}</span>
        </div>
        <div className="flex mt-2">
          {contents.map((v) => {
            return <ProfileStat key={shortid.generate()} title={v.title} count={v.count} />;
          })}
        </div>
      </section>
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
};

export default UserPanel;
