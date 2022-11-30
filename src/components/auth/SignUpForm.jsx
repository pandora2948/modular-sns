import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { AuthService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { passwordRegex, usernameRegex } from 'utils';
import { requiredRule } from 'utils/formRules';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  const createUser = useCallback(
    async (values) => {
      try {
        await AuthService.createUser(values);
        await message.success('회원가입 성공');
        navigate('/auth/sign-in');
      } catch (err) {
        await message.error(err.message);
      }
    },
    [navigate]
  );

  return (
    <section className="w-full">
      <h1 className="text-2xl mt-3 mb-5 text-center">회원가입</h1>

      <Form form={form} onFinish={createUser} onFinishFailed={onFormFinishFailed} scrollToFirstError {...layout}>
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: 'email',
              message: '올바른 이메일을 입력해주세요',
            },
            requiredRule,
          ]}
          hasFeedback={hasFeedback}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              pattern: passwordRegex,
              message: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요',
            },
            requiredRule,
          ]}
          hasFeedback={hasFeedback}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          name="password-confirm"
          label="비밀번호 확인"
          dependencies={['password']}
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          name="username"
          label="사용자 아이디"
          hasFeedback={hasFeedback}
          tooltip="다른 사람들에게 보여질 사용자명입니다."
          rules={[
            requiredRule,
            {
              pattern: usernameRegex,
              message: '4~15자 영문 대 소문자, 숫자, 밑줄을 사용하세요',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="실명"
          name="realname"
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            {
              pattern: usernameRegex,
              message: '4~15자 영문 대 소문자, 숫자, 밑줄을 사용하세요',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" className="w-full mt-4">
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

SignUpForm.propTypes = {};

export default SignUpForm;
