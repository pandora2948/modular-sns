import PropTypes from 'prop-types';
import Header from 'components/header/Header';
import Nav from 'components/nav/Nav';

const AppLayout = ({ children }) => (
  <main className="flex flex-col justify-between w-full h-screen md:w-[500px] bg-[#F0F2F5] relative">
    <Header />
    <section className="h-full overflow-y-scroll">{children}</section>
    <Nav />
  </main>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
