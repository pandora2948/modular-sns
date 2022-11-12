import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import AuthModal from 'components/authModal/AuthModal';
import { useModal } from 'hooks/useModal';
import HeaderSearch from './HeaderSearch';

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { isModalOpen, toggleModal, openModal } = useModal();

  const closeSearchVisible = useCallback(() => setOpenSearch(false), []);
  const toggleSearchVisible = useCallback(
    () => setOpenSearch((prev) => !prev),
    []
  );

  return (
    <>
      <header
        className="
        flex h-12 bg-white justify-between px-4 items-center shadow-md
        font-semibold relative
      "
      >
        <h1 className="m-0 text-lg text-slate-600 whitespace-nowrap">
          <Link to="/">sns-modular</Link>
        </h1>
        <nav className="flex gap-x-2">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={toggleSearchVisible}
          />
          <Button
            shape="circle"
            icon={<UserOutlined color="black" />}
            onClick={openModal}
          />
        </nav>

        {openSearch && <HeaderSearch closeSearch={closeSearchVisible} />}
      </header>

      <AuthModal isOpen={isModalOpen} toggle={toggleModal} />
    </>
  );
};

export default Header;
