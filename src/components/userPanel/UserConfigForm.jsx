import { useCallback } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserService } from 'api/services';
import { useFormValidateTrigger } from 'hooks/useFormValidateTrigger';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { realnameRegex, requiredRule, usernameRegex } from 'utils';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const UserConfigForm = () => {
  const [me, setMe] = useRecoilState(atomStore.meAtom);
  const { formValidateTrigger, onFormFinishFailed, hasFeedback } = useFormValidateTrigger();

  const submitUserConfig = useCallback(
    async ({ email, userName: username }) => {
      try {
        // setLoading(true);
        await UserService.updateLoginedUserData({ email, username });
        setMe((prv) => {
          return { ...prv, userMail: email, userName: username };
        });
        message.success('사용자 정보가 변경되었습니다.');
      } catch (error) {
        message.error(error.message);
      } finally {
        // setLoading(false);
      }
    },
    [setMe]
  );

  return (
    <section className="w-full">
      <Form
        onFinish={submitUserConfig}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstError
        initialValues={{
          email: me.email,
          userName: me.userName,
          realname: me.realname,
        }}
        {...layout}
      >
        <Form.Item
          name="email"
          label="이메일"
          hasFeedback={hasFeedback}
          rules={[{ type: 'email', message: '올바른 이메일을 입력해주세요' }, requiredRule]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="userName"
          label="사용자 아이디"
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
        <Form.Item
          name="realname"
          label="실명"
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            {
              pattern: realnameRegex,
              message: '1~12자 영문 대 소문자, 한글을 사용하세요',
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
