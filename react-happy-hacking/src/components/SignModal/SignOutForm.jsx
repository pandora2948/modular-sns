import PropTypes from 'prop-types';

export const SignOutForm = ({ show, children }) => {
  if (!show) return null;

  return (
    <div>
      <span>여기 폼 작성</span>
      { children }
    </div>
  );
};

SignOutForm.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
};
