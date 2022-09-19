import PropTypes from 'prop-types';
import { Header } from '../../components/Header';
import { NavBar } from '../../components/NavBar';

export const AppLayout = ({ children }) => (
  <main className="flex flex-col justify-between w-full h-full md:w-[500px] bg-[#F0F2F5]">
    <Header />
    <section className="py-10 h-full overflow-y-scroll">
      {children}
    </section>
    <NavBar />
  </main>
);

AppLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
