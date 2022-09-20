import PropTypes from 'prop-types';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { LoginModal } from '../../components/LoginModal';
import { NavBar } from '../../components/NavBar';

export const AppLayout = ({ children }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const handleLoginModal = () => setIsModalOn((prv) => !prv);

  return (
    <main className="flex flex-col justify-between w-full h-full md:w-[500px] bg-[#F0F2F5]">
      <LoginModal onClick={handleLoginModal} isOpen={isModalOn} />
      <Header onClick={handleLoginModal} />
      <section className="py-10 h-full overflow-y-scroll">{children}</section>
      <NavBar />
    </main>
  );
};

AppLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
