import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import shortid from 'shortid';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const PostCardCarousel = ({ images }) => {
  const [visible, setVisible] = useState(false);

  if (!images || images.length === 0) return null;
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {images.map((url) => (
          <SwiperSlide key={shortid.generate()} className="bg-black/90">
            <Image
              src={url}
              width="100%"
              height="auto"
              className="max-h-80 object-contain"
              preview={{ visible: false }}
              style={{
                minHeight: '18rem',
              }}
              onClick={() => setVisible(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (visible) => setVisible(visible) }}>
          {images.map((url) => (
            <Image key={shortid.generate()} src={url} width="100%" height="auto" />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

PostCardCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default PostCardCarousel;
