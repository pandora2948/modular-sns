import { useQuery } from 'react-query';
import shortid from 'shortid';

import { AppLayout } from '../layouts/AppLayout';
import { getPosts } from '../api/post';
import { Article } from '../components/Article';

export const Feed = () => {
  const {
    data: feeds = []
  } = useQuery('main-feed', getPosts);

  return (
    <AppLayout>
      <article className="flex flex-col gap-y-7">
        { feeds.map(feed => <Article key={shortid.generate()} {...feed} />) }
      </article>
    </AppLayout>
  );
};
