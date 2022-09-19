import { Card } from 'antd';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { ArticleCarousel } from './ArticleCarousel';

export const Article = (
  {
    images,
    writer,
    content,
    hashtags,
    comments,
  }
) => {
  return (
    <Card
      key={shortid.generate()}
      className="w-full"
      cover={<ArticleCarousel images={images} />}
    >
      mocking
    </Card>
  );
};

Article.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer:PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
