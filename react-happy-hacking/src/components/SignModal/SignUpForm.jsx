import { Button, Checkbox, Col, Form, Input, Row } from 'antd';

import PropTypes from 'prop-types';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const SignUpForm = ({ show, children }) => {
  const [form] = Form.useForm();
  if (!show) return null;

  return (
    <div>
      <h1 className="text-2xl">sign up</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        initialValues={{
          prefix: '82',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: '올바른 이메일을 입력해주세요',
            },
            {
              required: true,
              message: '이메일을 입력해주세요',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('비밀번호를 확인해주세요'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          tooltip="사용하실 이름을 입력해주세요"
          rules={[
            {
              required: true,
              message: '이름을 입력해주세요',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Captcha" extra="당신은 사람입니까?">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '사람임을 검증해주세요',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      {children}
    </div>
  );
};

SignUpForm.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
};
