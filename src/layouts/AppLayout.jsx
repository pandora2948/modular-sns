import PropTypes from 'prop-types';
import Header from 'components/header/Header';

const AppLayout = ({ children }) => (
  <div className="flex flex-col justify-between w-full h-screen md:w-[500px] bg-[#F0F2F5] relative">
    <Header />
    <main className="h-full overflow-y-scroll">{children}</main>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
