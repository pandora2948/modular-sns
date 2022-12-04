import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import HashtagList from 'components/hashtag/HashtagList';
import PostCardFooter from 'components/post/postCard/postFooter/PostCardFooter';
import UserIcon from 'components/userPanel/UserIcon';
import { useRecoilValue } from 'recoil';
import shortid from 'shortid';
import atomStore from 'store/atom';
import PostCardCarousel from './PostCardCarousel';
import PostEditDropdown from './PostEditDropdown';

const PostCard = ({
  post: {
    userInfo,
    textContent,
    likeCount,
    hashtags,
    comments,
    postId,
    createdDate,
    updatedDate,
    fileDownloadUrls,
    likeUp,
  },
}) => {
  const [postTimeInfo, setPostTimeInfo] = useState('');
  const me = useRecoilValue(atomStore.meAtom);
  const navigate = useNavigate();

  const handleUserProfileClicked = useCallback(() => {
    navigate(`/profile/${userInfo.username}`);
  }, [navigate, userInfo.username]);

  useEffect(() => {
    const postedDate = new Date(createdDate).toLocaleString();
    setPostTimeInfo(createdDate.includes(updatedDate) ? postedDate : postedDate + ' (수정됨)');
  }, [createdDate, updatedDate]);

  return (
    <article
      key={shortid.generate()}
      className="card flex border-gray-200 p-3"
      style={{
        borderTop: '1px solid',
      }}
    >
      <section className="relative mr-3">
        <Button type="text" onClick={handleUserProfileClicked} className="relative p-0 h-fit z-10 no-padding">
          <UserIcon size="m" username={userInfo.username} realname={userInfo.realname} />
        </Button>
        <div
          className="absolute border-gray-400"
          style={{
            borderRight: '0.5px solid',
            left: '50%',
            transform: 'translateX(-50%)',
            height: 'calc(100% - 3.5rem)',
          }}
        >
          <MoreOutlined
            className="absolute text-gray-400"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-48%)',
            }}
          />
        </div>
      </section>

      <section className="flex-1 overflow-x-auto">
        <section>
          <section className="relative flex items-center justify-between">
            <Button type="text" onClick={handleUserProfileClicked} className="flex items-center gap-1 p-0 h-fit">
              <span className="font-semibold">{userInfo.realname}</span>
              <span className="text-gray-500">@{userInfo.username}</span>
            </Button>
            {userInfo.userId === me.userId && (
              <PostEditDropdown postId={postId} className="absolute right-2 no-padding" />
            )}
          </section>
          <section className="leading-none">
            <span className="text-xs text-gray-400">{postTimeInfo}</span>
          </section>
          <section className="mt-2">
            <span>{textContent}</span>
            <HashtagList tags={hashtags} />
          </section>
        </section>

        {fileDownloadUrls.length !== 0 && (
          <section className="mt-3">
            <PostCardCarousel images={fileDownloadUrls} />
          </section>
        )}

        <PostCardFooter footerData={{ likeCount, comments, likeUp, postId }} />
      </section>
    </article>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    // images: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      email: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      realname: PropTypes.string.isRequired,
    }).isRequired,
    textContent: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        commentId: PropTypes.number.isRequired,
        articleId: PropTypes.number.isRequired,
        replyUserId: PropTypes.any,
        textContent: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
          userId: PropTypes.number.isRequired,
          email: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          realname: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ),
    createdDate: PropTypes.string,
    updatedDate: PropTypes.string,
    fileDownloadUrls: PropTypes.array.isRequired,
    likeUp: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PostCard;
