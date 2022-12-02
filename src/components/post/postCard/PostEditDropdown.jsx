import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';
import { useRecoilState } from 'recoil';
import { PostsService } from '../../../api/services';
import atomStore from '../../../store/atom';

const menuKeys = {
  editPost: '0',
  deletePost: '1',
};

const menuItems = [
  { label: '게시글 수정', key: menuKeys.editPost },
  { type: 'divider' },
  { label: '게시글 삭제', key: menuKeys.deletePost },
];

const PostEditDropdown = ({ postId }) => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const onPostEditClicked = useCallback(
    async ({ key }) => {
      switch (key) {
        case menuKeys.editPost:
          break;

        case menuKeys.deletePost: {
          await PostsService.deletePost({ postId })
            .then(() => {
              setPosts(posts.filter((el) => el.postId !== postId));
              message.success('게시글이 삭제되었습니다.');
            })
            .catch((err) => message.error(err));

          break;
        }

        default:
          break;
      }
    },
    [postId, posts, setPosts]
  );

  return (
    <Dropdown menu={{ items: menuItems, onClick: onPostEditClicked }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

PostEditDropdown.propTypes = { postId: PropTypes.number };

export default PostEditDropdown;
