import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CommentOutlined, HeartTwoTone, LikeOutlined } from '@ant-design/icons';
import { Divider, message, Popover, Typography } from 'antd';
import { PostsService } from 'api/services';
import PostCardButton from 'components/post/postCard/PostCardButton';
import PostCardCommentBox from 'components/post/postCard/PostCardCommentBox';
import PostCardCommentList from 'components/post/postCard/PostCardCommentList';

const { Text } = Typography;

const PostCardFooter = ({ footerData: { likeCount, comments, likeUp, postId } }) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const [likedButtonState, setLikedButtonState] = useState({ isLiked: likeUp, type: 'default' });

  const handleCommentBox = () => setIsOpenCommentBox((prev) => !prev);

  const onClickLikeBox = useCallback(async () => {
    if (likedButtonState.isLiked) {
      try {
        await PostsService.removeLikeToPost({ postId });
        setLikedButtonState(({ isLiked }) => ({ isLiked: !isLiked, type: 'default', likeCount: likeCount }));
      } catch (err) {
        message.error(err);
      }
    } else {
      try {
        await PostsService.addLikeToPost({ postId }).catch((err) => message.error(err));
        setLikedButtonState(({ isLiked }) => ({ isLiked: !isLiked, type: 'link', likeCount: likeCount }));
      } catch (err) {
        message.error(err);
      }
    }
  }, [likeCount, likedButtonState.isLiked, postId]);

  return (
    <>
      <section className="flex gap-x-1 items-center px-4 pb-3">
        <Popover placement="top" content="해당 게시글의 좋아요 갯수입니다." className="cursor-pointer">
          <HeartTwoTone style={{ fontSize: '1.1rem' }} />
        </Popover>
        <Text>{likedButtonState.likeCount}</Text>
      </section>
      <Divider className="m-0" />

      <section className="flex interact-space">
        <PostCardButton onClick={onClickLikeBox} type={likedButtonState.type}>
          <LikeOutlined className="pr-1" />
          <Text>좋아요</Text>
        </PostCardButton>
        <PostCardButton onClick={handleCommentBox}>
          <CommentOutlined className="pr-1" />
          <Text>{isOpenCommentBox ? '댓글 닫기' : '댓글 달기'}</Text>
        </PostCardButton>
      </section>

      <PostCardCommentBox open={isOpenCommentBox} />
      <PostCardCommentList comments={comments} />
    </>
  );
};

PostCardFooter.propTypes = {
  footerData: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        commentId: PropTypes.number.isRequired,
        articleId: PropTypes.number.isRequired,
        replyUserId: PropTypes.number.isRequired,
        textContent: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
          userId: PropTypes.number.isRequired,
          email: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ),
    likeUp: PropTypes.bool.isRequired,
    likeCount: PropTypes.number.isRequired,
  }),
};
export default PostCardFooter;
