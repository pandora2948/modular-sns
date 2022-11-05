import { Carousel, Image } from 'antd';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const ArticleCarousel = ({ images }) => {
  if (!images || images.length === 0)
    return null;

  return (
    <Carousel>
      {images.map(url => (
        <div key={shortid.generate()}>
          <Image src={url} width="100%" height="320px" />
        </div>
      ))}
    </Carousel>
  )
};

ArticleCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default ArticleCarousel;
