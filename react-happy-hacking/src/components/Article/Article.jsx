import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { ArticleCarousel } from './ArticleCarousel';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

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
      <section>
        <div className="flex gap-x-3 items-center">
          <UserOutlined size="32px" />
          <Text>{ writer }</Text>
        </div>
      </section>
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
