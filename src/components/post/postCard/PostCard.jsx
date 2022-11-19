import { useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined, LikeOutlined, CommentOutlined, HeartTwoTone } from '@ant-design/icons';
import { Typography, Divider, Popover } from 'antd';
import HashtagList from 'components/hashtag/HashtagList';
import PostCardButton from 'components/post/postCard/PostCardButton';
import PostCardCarousel from 'components/post/postCard/PostCardCarousel';
import PostCardCommentBox from 'components/post/postCard/PostCardCommentBox';
import PostCardCommentList from 'components/post/postCard/PostCardCommentList';
import shortid from 'shortid';

const { Text } = Typography;

const PostCard = ({ images, likeCount, writer, content, hashtags, comments }) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);

  const handleCommentBox = () => setIsOpenCommentBox((prev) => !prev);
  const onClickLikeBox = () => {};

  return (
    <div key={shortid.generate()} className="card">
      <PostCardCarousel images={images} />
      <section className="px-4 pt-4 pb-2">
        <div className="flex gap-x-3 items-center pb-0.5">
          <UserOutlined size="32px" />
          <Text>{writer}</Text>
        </div>
        <div>
          <Text className="pr-2">{content}</Text>
          <HashtagList tags={hashtags} />
        </div>
      </section>

      <section className="flex gap-x-1 items-center px-4 pb-3">
        <Popover placement="top" content="해당 게시글의 좋아요 갯수입니다." className="cursor-pointer">
          <HeartTwoTone style={{ fontSize: '1.1rem' }} />
        </Popover>
        <Text>{likeCount}</Text>
      </section>
      <Divider className="m-0" />

      <section className="flex interact-space">
        <PostCardButton onClick={onClickLikeBox}>
          <LikeOutlined className="pr-1" />
          <Text>좋아요</Text>
        </PostCardButton>
        <PostCardButton onClick={handleCommentBox}>
          <CommentOutlined className="pr-1" />
          <Text>{isOpenCommentBox ? '댓글 닫기' : '댓글 달기'}</Text>
        </PostCardButton>
      </section>

      <Divider className="m-0" />

      <PostCardCommentBox open={isOpenCommentBox} />
      <PostCardCommentList comments={comments} />
    </div>
  );
};

PostCard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default PostCard;
