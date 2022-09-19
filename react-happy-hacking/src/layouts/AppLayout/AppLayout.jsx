import PropTypes from 'prop-types';

export const AppLayout = ({ children }) => (
  <main className="flex flex-col justify-between w-full h-full md:w-[500px] bg-[#F0F2F5]">
    {children}
  </main>
);

AppLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
