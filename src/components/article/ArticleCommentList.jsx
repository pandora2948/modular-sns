import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import ArticleComment from 'components/article/ArticleComment';
import shortid from 'shortid';

const { Text } = Typography;

const ArticleCommentList = ({ comments }) => {
  const [isExpand, setIsExpand] = useState(false);
  const displayComments = isExpand ? comments : [comments[0]];

  const onClickHandleExpand = useCallback(() => {
    setIsExpand((prev) => !prev);
  }, []);

  return (
    <section className="flex flex-col justify-center p-3">
      {displayComments?.map((comment) => (
        <div key={shortid.generate()}>
          <ArticleComment keyId={shortid.generate()} comment={comment} />
        </div>
      ))}
      <Text key={shortid.generate()} className="text-sky-500 cursor-pointer w-fit" onClick={onClickHandleExpand}>
        {isExpand ? '댓글 닫기' : '댓글 더보기'}
      </Text>
    </section>
  );
};

ArticleCommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default ArticleCommentList;
