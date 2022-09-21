import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import PropTypes from 'prop-types';

export const SignModal = ({ isOpen, onClick }) => {

  /**
   * @param formValue 입력받은 폼 요소의 값들
   * @desc 여기서 값을 전달받아서 로그인, 회원가입 처리
   */
  const onFinish = formValue => {
    // 디버깅용 코드
    message.info('이메일: ' + formValue.email);
    message.info('비밀번호: ' + formValue.password);
    message.info('이메일 기억 여부: ' + formValue.remember);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClick}
      onOk={onClick}
      centered
      closable={false}
      footer={null}
    >
      <h1 className="text-2xl">sign in</h1>
      <Form
        name="normal_login"
        className="login-form pt-10"
        initialValues={{ remeber: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please write your email' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please write your password' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="float-right" href="/#">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Log in
          </Button>
          Or <a href="/#">register now!</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

SignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
