import { useCallback } from 'react';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const UserConfigForm = () => {
  const submitUserConfig = useCallback(({ userName }) => {
    console.log(userName);
  }, []);

  return (
    <section className="w-full">
      <Form onFinish={submitUserConfig}>
        <FormItem name="userName">
          <Input></Input>
        </FormItem>
      </Form>
    </section>
  );
};

export default UserConfigForm;
