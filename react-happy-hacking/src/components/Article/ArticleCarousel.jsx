import { Carousel, Image } from 'antd';
import PropTypes from 'prop-types';

export const ArticleCarousel = ({ images }) => {
  if (!images || images.length === 0)
    return null;

  return (
    <Carousel>
      {images.map(url => <Image src={url} />)}
    </Carousel>
  )
};

ArticleCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};
