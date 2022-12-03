import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { PostsService } from 'api/services';
import UserIcon from 'components/userPanel/UserIcon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import atomStore from 'store/atom';

const TEXT_CONTENT_MAX_LENGTH = 140;

const PostForm = ({ isModalOpened, handleModalClose }) => {
  const me = useRecoilValue(atomStore.meAtom);
  const [form] = Form.useForm();
  const [text, setText] = useState('');

  const setPosts = useSetRecoilState(atomStore.postsAtom);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleCloseModal = useCallback(() => {
    form.resetFields();
    setText('');
    handleModalClose();
  }, [handleModalClose, form]);

  const handleSubmit = useCallback(
    async ({ textContent }) => {
      try {
        const newPost = await PostsService.createPost({
          textContent,
        });
        setPosts((prev) => [newPost, ...prev]);
        handleCloseModal();
      } catch (e) {
        message.error(e);
      }
    },
    [handleCloseModal, setPosts]
  );

  return (
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
      open={isModalOpened}
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
        <Row className="w-full">
          <Col span={4}>
            <UserIcon size="m" username={me.username} realname={me.realname} />
          </Col>
          <Col span={20}>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

PostForm.propTypes = { isModalOpened: PropTypes.bool, handleModalClose: PropTypes.func };

export default PostForm;
