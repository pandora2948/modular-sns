import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Upload } from 'antd';
import { PostsService } from 'api/services';
import UserIcon from 'components/userPanel/UserIcon';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import shortid from 'shortid';
import atomStore from 'store/atom';

const TEXT_CONTENT_MAX_LENGTH = 140;

const PostForm = ({ visible, onCancel, initialValues }) => {
  const me = useRecoilValue(atomStore.meAtom);
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const [textareaFocus, setTextareaFocus] = useState(false);
  const setPosts = useSetRecoilState(atomStore.postsAtom);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

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
    onCancel();
  }, [onCancel, form]);

  const handleSubmit = useCallback(
    async ({ textContent }) => {
      try {
        // setLoading(true);

        const files = fileList.map((file) => file.originFileObj);

        console.log('submit files:', files);

        if (initialValues) {
          const edited = await PostsService.updatePost({
            postId: initialValues.postId,
            textContent,
            files,
          });
          setPosts((prevPosts) => {
            return prevPosts.map((post) => (post.postId === edited.postId ? edited : post));
          });
        } else {
          const added = await PostsService.createPost({
            textContent,
            files,
          });
          setPosts((prevPosts) => {
            return [added, ...prevPosts];
          });
        }
        setFileList([]);
        handleCloseModal();
      } catch (e) {
        messageApi.error(e.message);
      } finally {
        // setLoading(false);
      }
    },
    [fileList, handleCloseModal, initialValues, messageApi, setPosts]
  );

  useDidMountEffect(() => {
    if (!initialValues) return;

    setText(initialValues.textContent);
    form.setFieldsValue({
      textContent: initialValues.textContent,
    });

    (async () => {
      const initialFiles = [];

      try {
        for (const url of initialValues.fileDownloadUrls) {
          const res = await fetch(new Request(url));
          const blob = await res.blob();
          const file = new File([blob], url, {
            type: 'image/jpeg',
          });
          initialFiles.push({
            url,
            uid: shortid.generate(),
            originFileObj: file,
          });
        }
      } catch (e) {
        console.error('이전 파일 불러오던 중 에러발생', e);
      }

      setFileList(initialFiles);
    })();
  });

  return (
    <>
      {contextHolder}
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
              {initialValues ? '수정하기' : '작성하기'}
            </Button>
          </header>
        }
        closable={false}
        open={visible}
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
                className="relative w-full py-2 pr-2 border-gray-200"
                style={{
                  borderTop: '0.5px solid',
                }}
              >
                <section className="flex items-start">
                  <Upload
                    multiple
                    fileList={fileList}
                    listType="picture-card"
                    onRemove={(file) => {
                      const index = fileList.indexOf(file);
                      const newFileList = fileList.slice();
                      newFileList.splice(index, 1);
                      setFileList(newFileList);
                    }}
                    beforeUpload={(file) => {
                      const newFile = {
                        name: file.name,
                        uid: shortid.generate(),
                        originFileObj: file,
                      };
                      setFileList([...fileList, newFile]);
                      return false;
                    }}
                  >
                    {fileList.length < 6 && (
                      <Button type="text" className="no-padding" icon={<UploadOutlined className="text-base" />} />
                    )}
                  </Upload>
                </section>
                <section className="absolute top-[0.75rem] right-[0.25rem] leading-none">
                  {textareaFocus && <span className="text-sm">{`${textLength} / ${TEXT_CONTENT_MAX_LENGTH}`}</span>}
                </section>
              </footer>
            </section>
          </section>
        </Form>
      </Modal>
    </>
  );
};

PostForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    // images: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      email: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      realname: PropTypes.string.isRequired,
    }).isRequired,
    textContent: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        commentId: PropTypes.number.isRequired,
        articleId: PropTypes.number.isRequired,
        replyUserId: PropTypes.any,
        textContent: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
          userId: PropTypes.number.isRequired,
          email: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          realname: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ),
    createdDate: PropTypes.string,
    updatedDate: PropTypes.string,
    fileDownloadUrls: PropTypes.array.isRequired,
    likeUp: PropTypes.bool.isRequired,
  }),
};

export default PostForm;
