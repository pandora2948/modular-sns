import { useEffect } from 'react';
import { PostsService, UserService } from 'api/services';
import EmptySpace from 'components/empty/EmptySpace';
import PostCard from 'components/post/postCard/PostCard';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { handleErrorByAntdMessage } from 'utils/handler';

const Profile = () => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const [userProfileInfo, setUserProfileInfo] = useRecoilState(atomStore.userProfileInfo);

  useEffect(() => {
    PostsService.getUserPosts({ page: 0, size: 99999 })
      .then((data) => setPosts(data))
      .catch((e) => alert(e));
    UserService.getLoginedUser()
      .then((userProfileInfo) => setUserProfileInfo(userProfileInfo))
      .catch(handleErrorByAntdMessage);
  }, [setUserProfileInfo, setPosts]);

  if (!userProfileInfo) {
    return null;
  }
  return (
    <AppLayout>
      <PostCreateButton />

      <UserPanel userProfileInfo={userProfileInfo} />

      <EmptySpace />

      {posts?.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </AppLayout>
  );
};

export default Profile;
