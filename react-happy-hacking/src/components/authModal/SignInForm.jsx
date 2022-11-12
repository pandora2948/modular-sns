import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserService } from 'api/services';
import { useLocalStorage } from 'hooks/useLocalStorage';

const STORAGE_KEY = {
  email: 'sign-in-email',
  remember: 'sign-in-remember',
};

const SignInForm = ({ hidden, footerRender }) => {
  const [email, setEmail] = useLocalStorage(STORAGE_KEY.email, '');
  const [rememberChecked, setRememberChecked] = useLocalStorage(
    STORAGE_KEY.remember,
    false
  );

  const onFinish = useCallback(
    async ({ email, password, rememberChecked }) => {
      try {
        await UserService.login({
          email,
          password,
        });

        if (rememberChecked) {
          setEmail(email);
        }
      } catch (err) {
        await message.error(err.message);
      }
    },
    [setEmail]
  );

  if (hidden) return null;

  return (
    <section>
      <h1 className="text-2xl">sign in</h1>
      <Form
        name="normal_login"
        className="login-form pt-10"
        initialValues={{
          remember: rememberChecked,
          email,
        }}
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
            <Checkbox
              checked={rememberChecked}
              onClick={(e) => {
                setRememberChecked(e.target.checked);
              }}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <a className="float-right" href="/#">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Log in
          </Button>
        </Form.Item>

        {footerRender}
      </Form>
    </section>
  );
};

SignInForm.propTypes = {
  footerRender: PropTypes.node.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default SignInForm;
