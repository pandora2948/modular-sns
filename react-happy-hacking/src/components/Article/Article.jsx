import { Card } from 'antd';
import PropTypes from 'prop-types';
import { ArticleCarousel } from './ArticleCarousel';

export const Article = (
  {
    images,
    writer,
    content,
    hashtags,
    comments
  }
) => {
  return (
    <Card
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
  hashtags: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      writer:PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
