import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { atom, useSetRecoilState } from 'recoil';
import { token } from 'utils';
import { requiredRule } from 'utils/formRules';

export const userDataState = atom({
  key: 'userDataState',
  default: {},
});

const SignInForm = () => {
  const navigate = useNavigate();
  const { formValidateTrigger, onFormFinishFailed } = useFormValidateTrigger();
  const setUserDateState = useSetRecoilState(userDataState);

  const onFinish = useCallback(
    async ({ email, password, remember }) => {
      try {
        token.clear();

        const {
          accessToken,
          refreshToken,
          userInfo: { email: respondedUserEmail, userId: respondedUserId, username: respondedUserName },
        } = await AuthService.login({
          email,
          password,
        });

        setUserDateState(() => {
          return { userMail: respondedUserEmail, userId: respondedUserId, userName: respondedUserName };
        });

        token.refreshToken.set(refreshToken, remember);
        token.accessToken.set(accessToken);

        navigate('/');
      } catch (err) {
        await message.error(err.message);
      }
    },
    [navigate, setUserDateState]
  );

  return (
    <section className="w-full">
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
  );
};

SignInForm.propTypes = {};

export default SignInForm;
