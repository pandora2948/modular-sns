import { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { CommentsService } from 'api/services';
import { useRecoilValue } from 'recoil';
import { meAtom } from 'store/atom/user';

const PostCardCommentBox = ({ open, postId, handleComments }) => {
  const inputRef = useRef(null);
  const me = useRecoilValue(meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const onEnterComment = useCallback(
    async ({ key }) => {
      if (key !== 'Enter') return;

      const commentInput = inputRef.current;
      const comment = commentInput?.value;
      if (!comment || comment.trim() === '') return;

      try {
        const updatedComments = await CommentsService.postComment({
          postId,
          textContent: commentInput.value,
          ownerId: me.userId,
        });
        handleComments((prv) => [...prv, updatedComments]);
        commentInput.value = '';
      } catch (err) {
        messageApi.error(err.message);
      }
    },
    [handleComments, me.userId, messageApi, postId]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!open) return null;

  return (
    <section className="px-3 pt-3 flex items-center gap-x-1.5">
      {contextHolder}
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

PostCardCommentBox.propTypes = {
  open: PropTypes.bool.isRequired,
  postId: PropTypes.number.isRequired,
  handleComments: PropTypes.func,
};

export default PostCardCommentBox;
