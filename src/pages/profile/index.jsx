import { useEffect, useState } from 'react';
import { message } from 'antd';
import shortid from 'shortid';
import { PostsService } from '../../api/services';
import EmptyFeed from '../../components/empty/EmptyFeed';
import PostCard from '../../components/post/postCard/PostCard';
import UserPanel from '../../components/userPanel/UserPanel';
import AppLayout from '../../layouts/AppLayout';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    PostsService.getUserPosts(0, 3)
      .then((data) => setPosts(data))
      .catch((e) => message.error(e));
  }, []);
  return (
    <AppLayout>
      <UserPanel />
      {posts.length === 0 ? <EmptyFeed /> : posts.map((post) => <PostCard key={shortid.generate()} post={post} />)}
    </AppLayout>
  );
};

export default Profile;
