import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { postComment } from '../../api/post';

export const CommentBox = ({ open }) => {
  const inputRef = useRef(null);

  const { mutate: createComment, isSuccess, isError } = useMutation(
    ({ id, comment }) => postComment(id, comment),
  );

  /**
   * @description 댓글 작성 함수
   */
  const onEnterComment = useCallback(({ key }) => {
    const { value } = inputRef.current;
    if (key === 'Enter') {
      if (value.trim() === '') {
        message.error('댓글에 내용을 입력해야합니다.');
        return;
      }
      createComment({
        id: 1, // !TODO: 테스트므로 값 동적할당 필요
        comment: inputRef.current?.value,
      });
      if (inputRef.current)
        inputRef.current.value = '';
    }
  }, [createComment]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isSuccess)
      message.info('댓글을 작성했습니다!');
    if (isError)
      message.info('댓글 작성에 실패하였습니다.');
  }, [isSuccess, isError]);

  if (!open) return null;

  return (
    <section className="px-3 pt-3 flex items-center gap-x-1.5">
      <UserOutlined />
      <input
        placeholder="댓글을 입력하세요..."
        className="
          w-full rounded-2xl bg-white shadow-sm py-1 px-4
          border border-gray-200
        "
        ref={inputRef}
        onKeyDown={onEnterComment}
      >
      </input>
    </section>
  );
};

CommentBox.propTypes = {
  open: PropTypes.bool.isRequired,
};
