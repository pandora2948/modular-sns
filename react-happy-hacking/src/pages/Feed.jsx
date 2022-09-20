import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import shortid from 'shortid';

import { AppLayout } from '../layouts/AppLayout';
import { getPosts } from '../api/post';
import { Article } from '../components/Article';

export const Feed = () => {
  const [feedCount, setFeedCount] = useState(3);
  const {
    data: feeds = []
  } = useQuery(
    ['main-feed', feedCount],
    () => getPosts(feedCount)
  );
  const containerRef = useRef(null);

  useEffect(() => {
    let observer;
    if (containerRef.current) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ isIntersecting, boundingClientRect, intersectionRect  }) => {
          console.log(isIntersecting, boundingClientRect, intersectionRect);
        });
      }, {
        threshold:0.6
      });
      observer.observe(containerRef.current);
    }

    return () => observer?.disconnect();
  }, []);

  return (
    <AppLayout>
      <article className="flex flex-col gap-y-7" ref={containerRef}>
        { feeds.map(feed => <Article key={shortid.generate()} {...feed} />) }
      </article>
    </AppLayout>
  );
};
