import PropTypes from 'prop-types';
import { InfoCircleFilled, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const MarketItem = ({ description, name }) => {
  return (
    <div>
      <header className="flex justify-between">
        <section className="flex align-middle gap-x-3 items-center">
          <InfoCircleFilled />
          <p>{name}</p>
        </section>
        <Button type="primary" icon={<DownloadOutlined />} size="middle">
          Download
        </Button>
      </header>
      <p className="px-2 py-3">{description}</p>
    </div>
  );
};

MarketItem.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MarketItem;
