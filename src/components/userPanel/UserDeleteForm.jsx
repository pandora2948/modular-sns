import { Button, Form, Input, message } from 'antd';
import { useRecoilValue } from 'recoil';
import { UserService } from '../../api/services';
import { useFormValidateTrigger } from '../../hooks/useFormValidateTrigger';
import { passwordRegex, requiredRule } from '../../utils';
import { loginInfoState } from '../auth/SignInForm';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const UserDeleteForm = () => {
  const loginInfo = useRecoilValue(loginInfoState);
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();
  const [form] = Form.useForm();

  const deleteUser = ({ password }) => {
    UserService.deleteLoginedUser(password).catch((err) => message.error(err));
  };

  return (
    <div className="w-full flex flex-col">
      <span className="text-center font-bold text-lg mb-5">계정 삭제를 위한 비밀번호 확인</span>
      <Form
        onFinish={deleteUser}
        onFinishFailed={onFormFinishFailed}
        form={form}
        scrollToFirstError={formValidateTrigger}
        {...layout}
      >
        <Form.Item
          label={`${loginInfo.userName} 을 입력해주세요`}
          name="username"
          rules={[
            requiredRule,
            (getFieldValue) => ({
              validator(_, value) {
                if (value !== loginInfo.userName) {
                  return Promise.reject(new Error('사용자 명이 일치하지 않습니다.'));
                }
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="비밀번호" name="password">
          <Input.Password
            allowClear
            rules={[
              {
                pattern: passwordRegex,
                message: '올바른 비밀번호를 입력해주세요',
              },
              requiredRule,
            ]}
            hasFeedback={hasFeedback}
          />
        </Form.Item>
        <Form.Item>
          <Button type="danger" htmlType="submit">
            계정 삭제
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserDeleteForm;
