import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import PostForm from 'components/post/postForm/PostForm';
import { useModal } from 'hooks/useModal';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { handleErrorByAntdMessage } from 'utils/handler';
import { menuItems } from './constant';
import { processQuarterOnDropDownMenu } from './menu-quarter';
import { deletePostOnPostEditDropdown } from './network.io';

const PostEditDropdown = ({ initialValues, ...rest }) => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const { isModalOpen, openModal, closeModal } = useModal();

  const deletePost = useCallback(
    (postId) => {
      const successCb = (removedPosts) => {
        setPosts(removedPosts);
        alert('게시글을 삭제하였습니다.');
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
        postId: initialValues.postId,
        updatePost,
        deletePost,
      }),
    [initialValues.postId, updatePost, deletePost]
  );

  return (
    <>
      <Dropdown menu={{ items: menuItems, onClick: onPostEditClicked }}>
        <Button type="text" icon={<EllipsisOutlined className="text-xl text-gray-900" />} {...rest} />
      </Dropdown>
      {isModalOpen && <PostForm onCancel={closeModal} visible={true} initialValues={initialValues} />}
    </>
  );
};

PostEditDropdown.propTypes = {
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
  }).isRequired,
};

export default PostEditDropdown;
