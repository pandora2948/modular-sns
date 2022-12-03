import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { handleErrorByAntdMessage } from 'utils/handler';
import { menuItems } from './constant';
import { processQuarterOnDropDownMenu } from './menu-quarter';
import { deletePostOnPostEditDropdown } from './network.io';

const PostEditDropdown = ({ postId, updateCb }) => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);

  const deletePost = useCallback(
    (postId) => {
      const successCb = (removedPosts) => {
        setPosts(removedPosts);
        message.success('게시글을 삭제하였습니다.');
      };
      deletePostOnPostEditDropdown({
        posts,
        deletePostId: postId,
        successCb,
        failureCb: handleErrorByAntdMessage,
      });
    },
    [posts, setPosts]
  );

  const mockUpdatedCb = () => message.warn('준비되지 않은 기능입니다.');
  const onPostEditClicked = useCallback(
    ({ key }) =>
      processQuarterOnDropDownMenu({
        key,
        postId,
        deletePost,
        updatePost: mockUpdatedCb(),
      }),
    [deletePost, postId]
  );

  return (
    <Dropdown menu={{ items: menuItems, onClick: onPostEditClicked }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

PostEditDropdown.propTypes = {
  postId: PropTypes.number.isRequired,
  updateCb: PropTypes.func.isRequired,
};

export default PostEditDropdown;
