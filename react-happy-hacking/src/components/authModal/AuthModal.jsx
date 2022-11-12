import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthModal = ({ isOpen, toggle }) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const onModalCancel = useCallback(() => {
    setShowSignUpForm(false);
    toggle();
  }, [toggle]);

  const handleRegisterLinkClick = useCallback(() => {
    setShowSignUpForm(true);
  }, []);

  return (
    <Modal
      open={isOpen}
      onCancel={onModalCancel}
      centered
      footer={null}
      destroyOnClose
    >
      <SignInForm
        hidden={showSignUpForm}
        footerRender={
          <>
            Or
            <Button
              type="link"
              style={{ padding: '5px' }}
              onClick={handleRegisterLinkClick}
            >
              register now!
            </Button>
          </>
        }
      ></SignInForm>
      <SignUpForm show={showSignUpForm} />
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default AuthModal;
