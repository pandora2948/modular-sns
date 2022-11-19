import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import PostCardComment from 'components/post/postCard/PostCardComment';
import shortid from 'shortid';

const { Text } = Typography;

const PostCardCommentList = ({ comments }) => {
  const [isExpand, setIsExpand] = useState(false);
  const displayComments = isExpand ? comments : [comments[0]];

  const onClickHandleExpand = useCallback(() => {
    setIsExpand((prev) => !prev);
  }, []);

  return (
    <section className="flex flex-col justify-center p-3">
      {displayComments?.map((comment) => (
        <div key={shortid.generate()}>
          <PostCardComment keyId={shortid.generate()} comment={comment} />
        </div>
      ))}
      <Text key={shortid.generate()} className="text-sky-500 cursor-pointer w-fit" onClick={onClickHandleExpand}>
        {isExpand ? '댓글 닫기' : '댓글 더보기'}
      </Text>
    </section>
  );
};

PostCardCommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default PostCardCommentList;
