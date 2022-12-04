import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined, FileImageOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal } from 'antd';
import { PostsService } from 'api/services';
import UserIcon from 'components/userPanel/UserIcon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { alertNotImpl } from 'utils';

const TEXT_CONTENT_MAX_LENGTH = 140;

const PostForm = ({ isModalOpened, handleModalClose }) => {
  const me = useRecoilValue(atomStore.meAtom);
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const [textareaFocus, setTextareaFocus] = useState(false);
  const setPosts = useSetRecoilState(atomStore.postsAtom);

  const toggleTextareaFocus = useCallback(() => {
    setTextareaFocus((prev) => !prev);
  }, []);

  const textLength = useMemo(() => {
    return text.length;
  }, [text.length]);

  const handleChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleCloseModal = useCallback(() => {
    form.resetFields();
    setText('');
    handleModalClose();
  }, [handleModalClose, form]);

  const handleClickImageUploadButton = useCallback(() => {
    alertNotImpl();
  }, []);

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
          <Button
            type="text"
            shape="circle"
            className="no-padding"
            icon={<CloseOutlined className="text-xl text-gray-700" />}
            onClick={handleCloseModal}
          />
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
      style={{
        padding: 0,
      }}
      destroyOnClose
    >
      <Form form={form} onFinish={handleSubmit} className="w-full h-full flex flex-col items-end p-3">
        <section className="w-full flex gap-3">
          <section>
            <UserIcon size="m" username={me.username} realname={me.realname} />
          </section>
          <section className="flex-1">
            <Form.Item name="textContent" noStyle>
              <textarea
                value={text}
                onChange={handleChangeText}
                onFocus={toggleTextareaFocus}
                onBlur={toggleTextareaFocus}
                placeholder="무슨 일이 일어나고 있나요?"
                className="w-full h-40 placeholder-gray-500 text-xl border-none outline-none"
                maxLength={TEXT_CONTENT_MAX_LENGTH}
              />
            </Form.Item>

            <footer
              className="w-full bottom-0 left-0 flex items-center justify-between py-2 px-1= border-gray-300"
              style={{
                borderTop: '0.5px solid',
              }}
            >
              <section className="flex items-center">
                <Button
                  type="text"
                  onClick={handleClickImageUploadButton}
                  className="no-padding"
                  icon={<FileImageOutlined className="text-base" />}
                />
              </section>
              <section className="leading-none">
                {textareaFocus && <span className="text-sm">{`${textLength} / ${TEXT_CONTENT_MAX_LENGTH}`}</span>}
              </section>
            </footer>
          </section>
        </section>
      </Form>
    </Modal>
  );
};

PostForm.propTypes = { isModalOpened: PropTypes.bool, handleModalClose: PropTypes.func };

export default PostForm;
