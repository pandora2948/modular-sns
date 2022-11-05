import { useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import shortid from 'shortid';

const { Text } = Typography;

const ArticleComment = ({ comment }) => (
  <div className="flex items-center gap-x-3">
    <div className="flex gap-x-1 items-center">
      <UserOutlined />
      <Text>{comment.writer}</Text>
    </div>
    <Text>{comment.content}</Text>
  </div>
);

ArticleComment.propTypes = {
  comment: PropTypes.shape({
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

const ArticleCommentList = ({ comments }) => {
  const [expand, setExpand] = useState(false);

  const onClickHandleExpand = () => setExpand((prev) => !prev);
  const notExpand = !expand && comments.length >= 1;

  return (
    <section className="flex flex-col justify-center p-3">
      {notExpand && (
        <div key={shortid.generate()}>
          <ArticleComment comment={comments[0]} />
        </div>
      )}
      {expand &&
        comments?.map((comment) => (
          <div key={shortid.generate()}>
            <ArticleComment keyId={shortid.generate()} comment={comment} />
          </div>
        ))}
      {notExpand && (
        <Text
          key={shortid.generate()}
          className="text-sky-500 cursor-pointer w-fit"
          onClick={onClickHandleExpand}
        >
          댓글 더보기
        </Text>
      )}
      {expand && (
        <Text
          key={shortid.generate()}
          className="text-sky-500 cursor-pointer w-fit"
          onClick={onClickHandleExpand}
        >
          댓글 닫기
        </Text>
      )}
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
