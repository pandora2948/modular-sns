import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';
import PostForm from 'components/post/postForm/PostForm';
import { useModal } from 'hooks/useModal';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { handleErrorByAntdMessage } from 'utils/handler';
import { menuItems } from './constant';
import { processQuarterOnDropDownMenu } from './menu-quarter';
import { deletePostOnPostEditDropdown } from './network.io';

const PostEditDropdown = ({ postId, ...rest }) => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const { isModalOpen, openModal, closeModal } = useModal();

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

  const updatePost = useCallback(() => {
    openModal();
  }, [openModal]);

  const onPostEditClicked = useCallback(
    ({ key }) =>
      processQuarterOnDropDownMenu({
        key,
        postId,
        updatePost,
        deletePost,
      }),
    [deletePost, updatePost, postId]
  );

  return (
    <>
      <Dropdown menu={{ items: menuItems, onClick: onPostEditClicked }}>
        <Button type="text" icon={<EllipsisOutlined className="text-xl text-gray-900" />} {...rest} />
      </Dropdown>
      <PostForm handleModalClose={closeModal} isCreatePost={false} isModalOpened={isModalOpen} postId={postId} />
    </>
  );
};

PostEditDropdown.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostEditDropdown;
