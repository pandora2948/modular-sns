import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';
import { CommentsService } from 'api/services';
import { menuItems, menuKeys } from 'components/post/postCard/postFooter/postFooterComment/constant';

const PostCommentsDropdown = ({ commentId }) => {
  const handleDropdownClick = useCallback(
    async ({ key }) => {
      if (key === menuKeys.editComment) {
      }
      if (key === menuKeys.deleteComment) {
        try {
          await CommentsService.deleteComment({ commentId });

          message.success('댓글이 삭제되었습니다.');
        } catch (err) {
          message.error(err.message);
        }
      }
    },
    [commentId]
  );
  return (
    <Dropdown menu={{ items: menuItems, onClick: handleDropdownClick }}>
      <Button className="p-0 no-padding" type="text" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

PostCommentsDropdown.propTypes = { commentId: PropTypes.number };
export default PostCommentsDropdown;
