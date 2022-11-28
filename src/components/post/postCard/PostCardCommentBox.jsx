import { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

const PostCardCommentBox = ({ open }) => {
  const inputRef = useRef(null);

  const onEnterComment = useCallback(async ({ key }) => {
    if (key !== 'Enter') return;

    const commentInput = inputRef.current;
    const comment = commentInput?.value;
    if (!comment || comment.trim() === '') return;

    commentInput.value = '';
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

PostCardCommentBox.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default PostCardCommentBox;
