import { useState } from 'react';
import { Button, Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Search } from './Search';

export const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handleShowSearch = () => setOpenSearch(prev => !prev);

  return (
    <header>
      <section
        className="
        flex h-14 bg-white justify-between px-4 items-center shadow-md
        relative font-semibold
      "
      >
        <h1 className="text-lg text-slate-600 whitespace-nowrap">
          sns-modular
        </h1>
        <nav className="flex gap-x-2">
          <Avatar icon={<UserOutlined />} />
          <Button
            color="#0ea5e9"
            type="default"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleShowSearch}
          />
        </nav>
        <Search open={openSearch} setOpen={setOpenSearch} />
      </section>
    </header>
  );
};
