import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, message, Modal } from 'antd';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthModal = ({ isOpen, close }) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const closeModal = useCallback(() => {
    setShowSignUpForm(false);
    close();
  }, [close]);

  const openFindPasswordModal = useCallback(() => {
    /* TODO: 패스워드 찾기 모달 추가 */
    message.info('Not implemented');
  }, []);
  const openFindEmailModal = useCallback(() => {
    /* TODO: 이메일 찾기 모달 추가 */
    message.info('Not implemented');
  }, []);
  const openSignUpModal = useCallback(() => {
    setShowSignUpForm(true);
  }, []);

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      centered
      footer={null}
      destroyOnClose
    >
      <SignInForm
        hidden={showSignUpForm}
        footerRender={
          <div className="flex items-center justify-center pr-3">
            <Button
              type="text"
              className="p-0 text-gray-600"
              onClick={openFindPasswordModal}
            >
              비밀번호 찾기
            </Button>
            <Divider type="vertical" className="mt-0.5 border-gray-300" />
            <Button
              type="text"
              className="p-0 text-gray-600"
              onClick={openFindEmailModal}
            >
              이메일 찾기
            </Button>
            <Divider type="vertical" className="mt-0.5 border-gray-300" />
            <Button
              type="text"
              className="p-0 text-gray-600"
              onClick={openSignUpModal}
            >
              회원가입
            </Button>
          </div>
        }
      ></SignInForm>

      <SignUpForm show={showSignUpForm} closeModal={closeModal} />
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default AuthModal;
