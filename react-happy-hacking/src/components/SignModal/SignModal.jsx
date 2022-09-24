import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { SigninForm } from './SigninForm';
import { useState } from 'react';
import { SignUpForm } from './SignUpForm';

export const SignModal = ({ isOpen, onClick }) => {
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
      <SigninForm hidden={showSignOut}>
        Or{' '}
        <button
          type="button"
          onClick={onClickShowSignOutButton}
          className="text-sky-600"
        >
          register now!
        </button>
      </SigninForm>
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

SignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
