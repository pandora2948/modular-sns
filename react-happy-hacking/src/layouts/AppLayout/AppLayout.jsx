import PropTypes from 'prop-types';

export const AppLayout = ({ children }) => (
  <main className="w-full h-full md:w-500px">
    { children }
  </main>
);

AppLayout.PropTypes = {
 children: PropTypes.object,
};
