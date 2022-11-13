import { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { CommentsService } from 'api/services';
import { useMutation } from 'react-query';

const ArticleCommentBox = ({ open }) => {
  const inputRef = useRef(null);

  const { mutate: createComment, isError: createCommentFailure } = useMutation(
    async ({ id, comment }) => {
      return await CommentsService.postComment({ id, comment });
    }
  );

  const onEnterComment = useCallback(
    async ({ key }) => {
      if (key !== 'Enter') return;

      const commentInput = inputRef.current;
      const comment = commentInput?.value;
      if (!comment || comment.trim() === '') return;

      createComment({
        id: 1, // !TODO: 테스트므로 값 동적할당 필요
        comment,
      });

      commentInput.value = '';
    },
    [createComment]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (createCommentFailure) {
      message.info('댓글 작성에 실패하였습니다.');
    }
  }, [createCommentFailure]);

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
      />
    </section>
  );
};

ArticleCommentBox.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ArticleCommentBox;
