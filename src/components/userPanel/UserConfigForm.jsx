import { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useRecoilValue } from 'recoil';
import { UserService } from '../../api/services';
import { useFormValidateTrigger } from '../../hooks/useFormValidateTrigger';
import { passwordRegex, requiredRule } from '../../utils';
import { userDataState } from '../auth/SignInForm';

const UserConfigForm = () => {
  const userData = useRecoilValue(userDataState);

  const submitUserConfig = useCallback(({ email, userName, password }) => {
    UserService.updateLoginedUser(email, userName, password);
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
        <Form.Item name="userName" label="사용자 아이디" hasFeedback={hasFeedback} initialValue={userData.userName}>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          hasFeedback={hasFeedback}
          rules={[
            {
              pattern: passwordRegex,
              message: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요',
            },
            requiredRule,
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="비밀번호 확인"
          hasFeedback={hasFeedback}
          dependencies={['password']}
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
          <Input.Password />
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
