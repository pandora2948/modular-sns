import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import PostCardComment from 'components/post/postCard/postComment/PostCardComment';
import shortid from 'shortid';

const { Text } = Typography;

const PostCardCommentList = ({ comments }) => {
  const [isExpand, setIsExpand] = useState(false);
  const displayComments = isExpand ? comments : [comments[0]].filter(Boolean);

  const onClickHandleExpand = useCallback(() => {
    setIsExpand((prev) => !prev);
  }, []);

  if (comments.length === 0) {
    return;
  }

  return (
    <section className="flex flex-col justify-center p-3">
      {displayComments?.map((comment) => (
        <div key={shortid.generate()}>
          <PostCardComment keyId={shortid.generate()} comment={comment} />
        </div>
      ))}
      {
        <Text key={shortid.generate()} className="text-sky-500 cursor-pointer w-fit" onClick={onClickHandleExpand}>
          {isExpand ? '댓글 닫기' : '댓글 더보기'}
        </Text>
      }
    </section>
  );
};

PostCardCommentList.propTypes = {
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
      }),
    }).isRequired
  ).isRequired,
};

export default PostCardCommentList;
