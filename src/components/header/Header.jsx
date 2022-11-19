import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { token } from 'utils';
import HeaderSearch from './HeaderSearch';

const Header = ({ hideProfileIcon, hideSearchIcon }) => {
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);

  const closeSearchVisible = useCallback(() => setOpenSearch(false), []);
  const toggleSearchVisible = useCallback(() => setOpenSearch((prev) => !prev), []);

  const handleUserIcon = useCallback(() => {
    // TODO: 스토어 내 유저 정보 여부에 따라 분기하도록 변경
    token.accessToken.get() ? navigate('/profile') : navigate('/auth/sign-in');
  }, [navigate]);

  return (
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
        {!hideSearchIcon && <Button shape="circle" icon={<SearchOutlined />} onClick={toggleSearchVisible} />}
        {!hideProfileIcon && <Button shape="circle" icon={<UserOutlined color="black" />} onClick={handleUserIcon} />}
      </nav>

      {!hideSearchIcon && openSearch && <HeaderSearch closeSearch={closeSearchVisible} />}
    </header>
  );
};

Header.propTypes = {
  hideProfileIcon: PropTypes.bool,
  hideSearchIcon: PropTypes.bool,
};

export default Header;
