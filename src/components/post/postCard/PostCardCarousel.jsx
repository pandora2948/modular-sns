import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import shortid from 'shortid';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const PostCardCarousel = ({ images }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(false);

  const handleClickImage = useCallback((index) => {
    setCurrentImageIndex(index);
    setPreviewVisible(true);
  }, []);

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
        {images.map((url, index) => (
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
              onClick={() => {
                handleClickImage(index);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => {
              setPreviewVisible(visible);
            },
            current: currentImageIndex,
          }}
        >
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
