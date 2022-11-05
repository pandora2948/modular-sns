import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import AuthModal from 'components/authModal/AuthModal';
import { useModal } from 'hooks/useModal';
import HeaderSearch from './HeaderSearch';

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { open, handleFlip, handleOpen } = useModal();

  const handleShowSearch = () => setOpenSearch((prev) => !prev);

  return (
    <header>
      <AuthModal onClick={handleFlip} isOpen={open} />
      <section
        className="
        flex h-14 bg-white justify-between px-4 items-center shadow-md
        relative font-semibold
      "
      >
        <h1 className="text-lg text-slate-600 whitespace-nowrap">
          <Link to="/">sns-modular</Link>
        </h1>
        <nav className="flex gap-x-2">
          <Avatar
            className="cursor-pointer"
            onClick={handleOpen}
            icon={<UserOutlined />}
          />
          <Button
            color="#0ea5e9"
            type="default"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleShowSearch}
          />
        </nav>
        <HeaderSearch open={openSearch} setOpen={setOpenSearch} />
      </section>
    </header>
  );
};

export default Header;
