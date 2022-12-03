import PropTypes from 'prop-types';
import shortid from 'shortid';
import ProfileStat from './ProfileStat';
import UserConfigDropdown from './UserConfigDropdown';
import UserIcon from './UserIcon';

const UserPanel = ({ userStatus }) => {
  const { allFollowingCount, allFollowerCount, userInfo, allGivenLikeCount, allPostCount } = userStatus;

  const contents = [
    { title: '팔로잉', count: allFollowingCount },
    { title: '팔로워', count: allFollowerCount },
  ];

  return (
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
        <span className="font-bold text-lg mt-4">{userInfo.username}</span>
      </div>
      <div className="flex mt-2">
        {contents.map((v) => {
          return <ProfileStat key={shortid.generate()} title={v.title} count={v.count} />;
        })}
      </div>
    </section>
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
