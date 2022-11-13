import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { alertNotImpl } from 'utils';
import { requiredRule } from 'utils/formRules';

const SignInForm = ({ hidden, footerRender }) => {
  const { formValidateTrigger, onFormFinishFailed } = useFormValidateTrigger();
  const onFinish = useCallback(async ({ email, password, rememberChecked }) => {
    try {
      const token = await AuthService.login({
        email,
        password,
      });

      console.log('token:', token);

      if (rememberChecked) {
        /* TODO: 토큰 기억 할거면 로컬스토리지 */
      } else {
        /* TODO: 기억 안할거면 세션스토리지에 저장하기 */
      }
    } catch (err) {
      await message.error(err.message);
    }
  }, []);

  if (hidden) return null;

  return (
    <section>
      <h1 className="text-2xl mt-3 mb-7 text-center">로그인</h1>

      <Form
        onFinish={onFinish}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstError
      >
        <Form.Item name="email" rules={[requiredRule]}>
          <Input prefix={<UserOutlined />} placeholder="이메일" allowClear />
        </Form.Item>
        <Form.Item name="password" rules={[requiredRule]}>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
            allowClear
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                alertNotImpl();
              }
            }}
          >
            로그인 상태 유지
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full mt-5"
          >
            로그인
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
