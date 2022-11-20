import { useEffect, useRef, useState } from 'react';
import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostForm from 'components/post/postForm/PostForm';
import AppLayout from 'layouts/AppLayout';
import { useQuery } from 'react-query';
import shortid from 'shortid';

const FEED_KEY = 'main-feed';

const Feed = () => {
  const [postCount] = useState(3);
  const { data: posts = [] } = useQuery([FEED_KEY, postCount], async () => {
    return await PostsService.getPosts({ page: 0, size: postCount });
  });
  const containerRef = useRef(null);

  useEffect(() => {
    let observer;
    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ _isIntersecting, _boundingClientRect, _intersectionRect }) => {
            // log.info(isIntersecting, boundingClientRect, intersectionRect);
          });
        },
        {
          threshold: 0.6,
        }
      );
      observer.observe(containerRef.current);
    }

    return () => observer?.disconnect();
  }, []);

  return (
    <AppLayout>
      <PostForm />

      {posts.length === 0 ? (
        <section className="h-full flex flex-col justify-center">
          <EmptyFeed />
        </section>
      ) : (
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
