import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import AppLayout from 'layouts/AppLayout';
import { useRecoilState } from 'recoil';
import atomStore from 'store/atom';

const Feed = () => {
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const getPosts = useCallback(
    async (page, size) => {
      try {
        // setLoading(true);
        const posts = await PostsService.getPosts({ page, size });
        setPosts(posts);
        setInitialLoaded(true);
      } catch (err) {
        await messageApi.error(err.message, 1);
        navigate('/auth/sign-in');
      } finally {
        // setLoading(false);
      }
    },
    [messageApi, navigate, setPosts]
  );

  // TODO: 페이지네이션 구현하기
  useDidMountEffect(() => {
    getPosts(0, 999).then();
  });

  if (!initialLoaded) {
    return (
      <AppLayout>
        {contextHolder}
        <PostCardsSkeleton />
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {contextHolder}
      <PostCreateButton />
      {posts.length === 0 ? <EmptyFeed /> : posts.map((post) => <PostCard key={post.postId} post={post} />)}
    </AppLayout>
  );
};

export default Feed;
