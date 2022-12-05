import { useCallback, useState } from 'react';
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

  const getPosts = useCallback(
    async (page, size) => {
      try {
        // setLoading(true);
        const posts = await PostsService.getPosts({ page, size });
        setPosts(posts);
        setInitialLoaded(true);
      } catch (err) {
        alert(err);
      } finally {
        // setLoading(false);
      }
    },
    [setPosts]
  );

  // TODO: 페이지네이션 구현하기
  useDidMountEffect(() => {
    getPosts(0, 999).then();
  });

  if (!initialLoaded) {
    return (
      <AppLayout>
        <PostCardsSkeleton />
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <PostCreateButton />

      {posts.length === 0 ? <EmptyFeed /> : posts.map((post) => <PostCard key={post.postId} post={post} />)}
    </AppLayout>
  );
};

export default Feed;
