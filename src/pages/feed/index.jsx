import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostForm from 'components/post/postForm/PostForm';
import AppLayout from 'layouts/AppLayout';
import { atom, useRecoilState } from 'recoil';
import shortid from 'shortid';

export const postsState = atom({ key: 'postsState', default: [] });

const Feed = () => {
  const [postCount] = useState(3);
  const [posts, setPosts] = useRecoilState(postsState);
  useEffect(() => {
    PostsService.getPosts(0, 3)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((e) => message.error(e));

    return () => {};
  }, [postCount, setPosts]);

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
