import { useCallback, useState } from 'react';
import { ArrowLeftOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { PostsService } from 'api/services';
import { useModal } from 'hooks/useModal';

const PostForm = () => {
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();

  const onChangeText = useCallback((e) => {
    const { value } = e.target;
    if (value.length > 140) return; // antd TextArea maxLength is not work

    setText(value);
  }, []);

  const handleSubmit = useCallback(async ({ textContent }) => {
    try {
      await PostsService.createPost({ textContent });
    } catch (e) {}
  }, []);

  return (
    <>
      <Button
        className="fixed right-6 bottom-6 w-14 h-14"
        type="primary"
        shape="circle"
        icon={<FormOutlined className="text-2xl" />}
        onClick={openModal}
      />

      <Modal
        title={
          <header className="flex justify-between">
            <Button type="text" shape="circle" icon={<ArrowLeftOutlined />} onClick={closeModal} />
            <Button type="primary" onClick={form.submit} disabled={!text}>
              작성하기
            </Button>
          </header>
        }
        closable={false}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="w-full h-full absolute top-0 left-0 m-0 max-w-full bg-white shadow-none full-content header-padding-3"
        maskStyle={{
          position: 'relative',
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Form form={form} onFinish={handleSubmit} className="w-full h-full flex flex-col items-end p-3">
          <Form.Item name="textContent" noStyle>
            <Input.TextArea
              value={text}
              onChange={onChangeText}
              placeholder="무슨 일이 일어나고 있나요?"
              className="h-36 placeholder-gray-500 text-base"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

PostForm.propTypes = {};

export default PostForm;
