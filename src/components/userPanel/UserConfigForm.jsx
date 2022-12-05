import { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
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
    async (values) => {
      try {
        // setLoading(true);
        await UserService.updateLoginedUserData(values);

        setMe((prv) => {
          return { ...prv, ...values };
        });
        alert('사용자 정보가 변경되었습니다.');
      } catch (error) {
        alert(error.message);
      } finally {
        // setLoading(false);
      }
    },
    [setMe]
  );
  console.log('me', me);

  return (
    <section className="w-full">
      <Form
        onFinish={submitUserConfig}
        validateTrigger={formValidateTrigger}
        onFinishFailed={onFormFinishFailed}
        scrollToFirstError
        initialValues={{
          email: me.email,
          username: me.username,
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
          name="username"
          label="사용자 아이디"
          hasFeedback={hasFeedback}
          rules={[
            requiredRule,
            {
              pattern: usernameRegex,
              message: '4~15자 영문 대 소문자, 숫자, 밑줄을 사용하세요. 최소 한개의 영문이 포함되어야 합니다',
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
