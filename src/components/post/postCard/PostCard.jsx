import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Typography, Divider, Button } from 'antd';
import HashtagList from 'components/hashtag/HashtagList';
import PostCardFooter from 'components/post/postCard/postFooter/PostCardFooter';
import { useRecoilValue } from 'recoil';
import shortid from 'shortid';
import atomStore from 'store/atom';
import PostCardCarousel from './PostCardCarousel';
import PostEditDropdown from './PostEditDropdown';

const { Text } = Typography;

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
    <div key={shortid.generate()} className="card">
      <PostCardCarousel images={fileDownloadUrls} />
      <section className="px-4 pt-4 pb-2">
        <div className="flex items-center pb-0.5 justify-between">
          <Button type="text" onClick={handleUserProfileClicked} className="p-0">
            <UserOutlined size="32px" />
            <Text>{userInfo.username}</Text>
          </Button>
          {userInfo.userId === me.userId && <PostEditDropdown postId={postId} />}
        </div>
        <div>
          <span className="text-xs text-gray-400">{postTimeInfo}</span>
        </div>
        <div>
          <Text className="pr-2">{textContent}</Text>
          <HashtagList tags={hashtags} />
        </div>
      </section>
      <PostCardFooter footerData={{ likeCount, comments, likeUp, postId }} />
      <Divider className="m-0" />
    </div>
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
