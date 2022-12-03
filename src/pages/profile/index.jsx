import { useEffect, useState } from 'react';
import { message } from 'antd';
import { PostsService, UserService } from 'api/services';
import PostCard from 'components/post/postCard/PostCard';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';
import { handleErrorByAntdMessage } from 'utils/handler';

const Profile = () => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const [user, setUser] = useState();

  useEffect(() => {
    PostsService.getUserPosts({ page: 0, size: 99999 })
      .then((data) => setPosts(data))
      .catch((e) => message.error(e));
    UserService.getLoginedUser()
      .then((user) => setUser(user))
      .catch(handleErrorByAntdMessage);
  }, [setPosts]);

  if (!user) {
    return null;
  }
  return (
    <AppLayout>
      <UserPanel userStatus={user} />
      {posts?.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </AppLayout>
  );
};

export default Profile;
