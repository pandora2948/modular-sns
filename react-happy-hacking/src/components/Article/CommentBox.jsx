import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

export const CommentBox = ({ open }) => {

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
      >
      </input>
    </section>
  );
};

CommentBox.propTypes = {
  open: PropTypes.bool.isRequired,
};
