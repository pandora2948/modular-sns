import PropTypes from 'prop-types';
import { Empty } from 'antd';

const EmptyFeed = ({ content = '아직 피드가 없습니다.' }) => (
  <Empty
    imageStyle={{
      height: 80,
    }}
    description={
      <div>
        <p>{content}</p>
      </div>
    }
  />
);

EmptyFeed.propTypes = {
  content: PropTypes.string,
};

export default EmptyFeed;
