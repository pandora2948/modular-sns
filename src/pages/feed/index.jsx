import { useEffect, useRef, useState } from 'react';
import { PostsService } from 'api/services';
import Article from 'components/article/Article';
import AppLayout from 'layouts/AppLayout';
import { useQuery } from 'react-query';
import shortid from 'shortid';

const FEED_KEY = 'main-feed';

const Feed = () => {
  const [feedCount] = useState(3);
  const { data: feeds = [] } = useQuery([FEED_KEY, feedCount], async () => {
    return await PostsService.getPosts({ page: 1, size: feedCount });
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
      <article className="flex flex-col gap-y-7" ref={containerRef}>
        {feeds.map((feed) => (
          <Article key={shortid.generate()} {...feed} />
        ))}
      </article>
    </AppLayout>
  );
};

export default Feed;
