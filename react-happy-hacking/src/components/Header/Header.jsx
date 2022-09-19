import { useState } from 'react';
import { Button, Avatar, Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

export const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header
      className="
        flex h-14 bg-white justify-between px-4 items-center shadow-md
        relative font-semibold
      "
    >
      <h1 className="text-lg text-slate-600">sns-modular</h1>
      <nav className="flex gap-x-2">
        <Avatar icon={<UserOutlined />} />
        <Button
          color="#0ea5e9"
          type="default"
          shape="circle"
          icon={<SearchOutlined />}
          onClick={() => setOpenSearch(prev => !prev)}
        />
      </nav>
      {openSearch &&
        <div className="absolute right-1 -bottom-12 transition ease-in">
          <Input.Search size="large" />
        </div>
      }
    </header>
  );
};
