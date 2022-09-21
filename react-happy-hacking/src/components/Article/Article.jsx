import { useState } from 'react';
import { Typography, Divider } from 'antd';
import {
  UserOutlined,
  LikeOutlined,
  CommentOutlined,
  HeartTwoTone
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { ArticleCarousel } from './ArticleCarousel';
import { InteractButton } from './InteractButton';
import { Hashtags } from './Hashtags';
import { CommentBox } from './CommentBox';
import { CommentList } from './CommentList';

const { Text } = Typography;

export const Article = (
  {
    images,
    likeCount,
    writer,
    content,
    hashtags,
    comments
  }) => {
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);

  const handleCommentBox = () => setIsOpenCommentBox((prev) => !prev);
  const onClickLikeBox = () => {};

  return (
    <div key={shortid.generate()} className="card">
      <ArticleCarousel images={images} />

      <section className="px-4 pt-2 pt-4 pb-2">
        <div className="flex gap-x-3 items-center pb-0.5">
          <UserOutlined size="32px" />
          <Text>{writer}</Text>
        </div>
        <div>
          <Text className="pr-2">{content}</Text>
          <Hashtags tags={hashtags} />
        </div>
      </section>

      <section className="flex gap-x-1 items-center px-4 pb-3">
        <HeartTwoTone style={{ fontSize: '1.1rem' }} />
        <Text>{ likeCount }</Text>
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
  likeCount: PropTypes.number.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
