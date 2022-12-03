import { useCallback, useState } from 'react';
import { ArrowLeftOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import { PostsService } from 'api/services';
import { useModal } from 'hooks/useModal';
import { useSetRecoilState } from 'recoil';
import atomStore from '../../../store/atom';

const TEXT_CONTENT_MAX_LENGTH = 140;

const PostForm = () => {
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const setPosts = useSetRecoilState(atomStore.postsAtom);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleCloseModal = useCallback(() => {
    form.resetFields();
    setText('');
    closeModal();
  }, [closeModal, form]);

  const handleSubmit = useCallback(
    async ({ textContent }) => {
      try {
        await PostsService.createPost({
          textContent,
        });
        setPosts(await PostsService.getPosts({ page: 0, size: 9999 }));
        handleCloseModal();
      } catch (e) {
        message.error(e);
      }
    },
    [handleCloseModal, setPosts]
  );

  return (
    <>
      <Button
        className="fixed right-6 bottom-6 w-14 h-14 z-[9999]"
        type="primary"
        shape="circle"
        icon={<FormOutlined className="text-2xl" />}
        onClick={openModal}
        style={{
          display: isModalOpen ? 'none' : 'initial',
        }}
      />

      <Modal
        title={
          <header className="flex justify-between">
            <Button type="text" shape="circle" icon={<ArrowLeftOutlined />} onClick={handleCloseModal} />
            <Button type="primary" onClick={form.submit} disabled={!text}>
              작성하기
            </Button>
          </header>
        }
        closable={false}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        className="w-full h-full absolute top-0 left-0 m-0 max-w-full bg-white shadow-none full-content header-padding-3"
        maskStyle={{
          position: 'relative',
        }}
        bodyStyle={{
          padding: 0,
        }}
        destroyOnClose
      >
        <Form form={form} onFinish={handleSubmit} className="w-full h-full flex flex-col items-end p-3">
          <Form.Item name="textContent" noStyle>
            <Input.TextArea
              value={text}
              onChange={onChangeText}
              placeholder="무슨 일이 일어나고 있나요?"
              className="w-full h-36 placeholder-gray-500 text-base"
              maxLength={TEXT_CONTENT_MAX_LENGTH}
              showCount={({ count, maxLength }) => `${count} / ${maxLength}`}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

PostForm.propTypes = {};

export default PostForm;
