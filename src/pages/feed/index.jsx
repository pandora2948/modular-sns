import { useCallback, useRef, useState } from 'react';
import { message } from 'antd';
import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import PostForm from 'components/post/postForm/PostForm';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import AppLayout from 'layouts/AppLayout';
import { useRecoilState } from 'recoil';
import shortid from 'shortid';
import atomStore from 'store/atom';

const Feed = () => {
  // const [postCount] = useState(3);
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const containerRef = useRef(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const getPosts = useCallback(
    async (page, size) => {
      try {
        // setLoading(true);
        const posts = await PostsService.getPosts({ page, size });
        setPosts(posts);
        setInitialLoaded(true);
      } catch (err) {
        message.error(err);
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
      <PostForm />
      {posts?.length === 0 && (
        <section className="h-full flex flex-col justify-center">
          <EmptyFeed />
        </section>
      )}
      {posts?.length > 0 && (
        <section className="flex flex-col gap-y-7" ref={containerRef}>
          {posts.map((post) => (
            <PostCard key={shortid.generate()} post={post} />
          ))}
        </section>
      )}
    </AppLayout>
  );
};

export default Feed;
