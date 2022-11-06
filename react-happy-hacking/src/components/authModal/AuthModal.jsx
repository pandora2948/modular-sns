import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
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
        <Button type="link" onClick={onClickShowSignOutButton}>
          register now!
        </Button>
      </SignInForm>
      <SignUpForm show={showSignOut}>
        Or{' '}
        <Button type="link" onClick={onClickShowSignInButton}>
          register now!
        </Button>
      </SignUpForm>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AuthModal;
