import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { useSetRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { token } from 'utils';
import { requiredRule } from 'utils/formRules';

const SignInForm = () => {
  const navigate = useNavigate();
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const setMe = useSetRecoilState(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = useCallback(
    async ({ email, password, remember }) => {
      try {
        token.clear();

        const { accessToken, refreshToken, userInfo } = await AuthService.login({
          email,
          password,
        });

        setMe(() => userInfo);

        token.refreshToken.set(refreshToken, remember);
        token.accessToken.set(accessToken);

        navigate('/');
      } catch (err) {
        messageApi.error(err.message);
      }
    },
    [messageApi, navigate, setMe]
  );

  return (
    <>
      {contextHolder}
      <section className="w-full">
        <h1 className="text-2xl mt-3 mb-7 text-center">로그인</h1>

        <Form
          onFinish={onFinish}
          validateTrigger={formValidateTrigger}
          onFinishFailed={onFormFinishFailed}
          scrollToFirstError
        >
          <Form.Item name="email" rules={[requiredRule]} hasFeedback={hasFeedback}>
            <Input prefix={<UserOutlined />} placeholder="이메일" allowClear />
          </Form.Item>
          <Form.Item name="password" rules={[requiredRule]} hasFeedback={hasFeedback}>
            <Input prefix={<LockOutlined />} type="password" placeholder="비밀번호" allowClear />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>로그인 상태 유지</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" className="w-full mt-5">
              로그인
            </Button>
          </Form.Item>

          <div className="flex items-center justify-center pr-3">
            <Link to="/auth/find-password" className="p-0 text-gray-600">
              비밀번호 찾기
            </Link>
            <Divider type="vertical" className="mt-0.5 border-gray-300" />
            <Link to="/auth/find-email" className="p-0 text-gray-600">
              이메일 찾기
            </Link>
            <Divider type="vertical" className="mt-0.5 border-gray-300" />
            <Link to="/auth/sign-up" className="p-0 text-gray-600">
              회원가입
            </Link>
          </div>
        </Form>
      </section>
    </>
  );
};

SignInForm.propTypes = {};

export default SignInForm;
