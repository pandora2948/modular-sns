import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const Header = () => {
  return (
    <header
      className="
        flex h-14 bg-white justify-between px-4 items-center
      "
    >
      <h1>sns-modular</h1>
      <nav>
        <Button
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
        />
      </nav>
    </header>
  );
};
