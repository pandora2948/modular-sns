import { useState } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthModal = ({ isOpen, onClick }) => {
  const [showSignOut, setShowSignOut] = useState(false);

  const onClickShowSignOutButton = () => setShowSignOut(true);
  const onClickShowSignInButton = () => setShowSignOut(false);

  return (
    <Modal
      open={isOpen}
      onCancel={onClick}
      onOk={onClick}
      centered
      closable={false}
      footer={null}
    >
      <SignInForm hidden={showSignOut}>
        Or{' '}
        <button
          type="button"
          onClick={onClickShowSignOutButton}
          className="text-sky-600"
        >
          register now!
        </button>
      </SignInForm>
      <SignUpForm show={showSignOut}>
        Or{' '}
        <button
          type="button"
          onClick={onClickShowSignInButton}
          className="text-sky-600 bg-[#1890ff]"
        >
          register now!
        </button>
      </SignUpForm>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AuthModal;
