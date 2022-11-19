import PropTypes from 'prop-types';
import { Carousel, Image } from 'antd';
import shortid from 'shortid';

const PostCardCarousel = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <>
      <Carousel>
        {images.map((url) => (
          <div key={shortid.generate()} className="bg-black/90">
            <div className="flex justify-center">
              <Image
                src={url}
                width="100%"
                height="auto"
                className="max-h-80 object-contain"
                style={{
                  minHeight: '18rem',
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

PostCardCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default PostCardCarousel;
