import { useEffect } from 'react';
import { message } from 'antd';
import { useRecoilState } from 'recoil';
import shortid from 'shortid';
import { PostsService } from '../../api/services';
import PostCard from '../../components/post/postCard/PostCard';
import UserPanel from '../../components/userPanel/UserPanel';
import AppLayout from '../../layouts/AppLayout';
import atomStore from '../../store/atom';

const Profile = () => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);

  useEffect(() => {
    PostsService.getUserPosts({ page: 0, size: 99999 })
      .then((data) => setPosts(data))
      .catch((e) => message.error(e));
  }, [setPosts]);

  if (posts?.length <= 0) return null;

  return (
    <AppLayout>
      <UserPanel />
      {posts.map((post) => (
        <PostCard key={shortid.generate()} post={post} />
      ))}
    </AppLayout>
  );
};

export default Profile;
