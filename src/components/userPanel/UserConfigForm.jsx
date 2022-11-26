import { useCallback } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useRecoilValue } from 'recoil';
import { UserService } from '../../api/services';
import { useFormValidateTrigger } from '../../hooks/useFormValidateTrigger';
import { requiredRule, usernameRegex } from '../../utils';
import { loginInfoState } from '../auth/SignInForm';

const UserConfigForm = () => {
  const loginInfo = useRecoilValue(loginInfoState);

  const submitUserConfig = useCallback(async ({ email, userName }) => {
    try {
      await UserService.updateLoginedUserData(email, userName);
    } catch (error) {
      await message.error(error.message);
    }
  }, []);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  return (
    <section className="w-full">
      <Form
        onFinish={submitUserConfig}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstError
        {...layout}
      >
        <Form.Item
          name="email"
          label="이메일"
          hasFeedback={hasFeedback}
          initialValue={loginInfo.userMail}
          rules={[{ type: 'email', message: '올바른 이메일을 입력해주세요' }, requiredRule]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="userName"
          label="사용자 아이디"
          hasFeedback={hasFeedback}
          initialValue={loginInfo.userName}
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
          <Button type="primary" htmlType="submit">
            변경하기
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default UserConfigForm;
