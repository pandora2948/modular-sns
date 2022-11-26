import { useCallback } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserService } from '../../api/services';
import { useFormValidateTrigger } from '../../hooks/useFormValidateTrigger';
import { passwordRegex, requiredRule } from '../../utils';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const PasswordConfigForm = () => {
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const [form] = Form.useForm();
  const updatePassword = useCallback(async ({ prvPassword, passwordConfirm }) => {
    await UserService.updateLoginedUserPassword(prvPassword, passwordConfirm)
      .then()
      .catch((error) => {
        message.error(error);
      });
  }, []);

  return (
    <>
      <Form
        className="w-full"
        form={form}
        onFinish={updatePassword}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstErrorvalidateTrigger={formValidateTrigger}
        {...layout}
      >
        <Form.Item
          label="기존 비밀번호"
          name="prvPassword"
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
          name="passwordConfirm"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            변경하기
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PasswordConfigForm;
