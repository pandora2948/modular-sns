import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { loginUserApi } from 'api/user';
import { useLocalStorage } from 'hooks/useLocalStorage';

const REMEMBER_CHECKED_STORAGE_KEY = 'remember-checked';

const SignInForm = ({ hidden, children }) => {
  const [email, setEmail] = useLocalStorage(REMEMBER_CHECKED_STORAGE_KEY, '');
  const [rememberChecked, setRememberChecked] = useLocalStorage(
    REMEMBER_CHECKED_STORAGE_KEY,
    false
  );

  const onFinish = useCallback(
    async ({ email, password }) => {
      await loginUserApi(email, password);
      setEmail(email);
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
        {children}
      </Form>
    </section>
  );
};

SignInForm.propTypes = {
  children: PropTypes.array.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default SignInForm;
