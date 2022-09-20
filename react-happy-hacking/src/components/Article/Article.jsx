import { Typography, Divider } from 'antd';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { ArticleCarousel } from './ArticleCarousel';
import { UserOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { InteractButton } from './InteractButton';
import { Hashtags } from './Hashtags';
import { useState } from 'react';
import { CommentBox } from './CommentBox';
import { CommentList } from './CommentList';

const { Text } = Typography;

export const Article = ({ images, writer, content, hashtags, comments }) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);

  const handleCommentBox = () => setIsOpenCommentBox((prev) => !prev);
  const onClickLikeBox = () => {};

  return (
    <div key={shortid.generate()} className="card">
      <ArticleCarousel images={images} />

      <section className="px-4 pt-2 py-4">
        <div className="flex gap-x-3 items-center pb-0.5">
          <UserOutlined size="32px" />
          <Text>{writer}</Text>
        </div>
        <div>
          <Text className="pr-2">{content}</Text>
          <Hashtags tags={hashtags} />
        </div>
      </section>

      <Divider className="m-0" />

      <section className="flex interact-space">
        <InteractButton onClick={onClickLikeBox}>
          <LikeOutlined className="pr-1" />
          <Text>좋아요</Text>
        </InteractButton>
        <InteractButton onClick={handleCommentBox}>
          <CommentOutlined className="pr-1" />
          <Text>{isOpenCommentBox ? '댓글 닫기' : '댓글 달기'}</Text>
        </InteractButton>
      </section>

      <Divider className="m-0" />

      <CommentBox open={isOpenCommentBox} />
      <CommentList comments={comments} />
    </div>
  );
};

Article.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
