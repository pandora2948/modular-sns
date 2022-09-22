import { AppLayout } from '../layouts/AppLayout';
import { useLoaderData } from 'react-router';
import { useQuery } from 'react-query';
import { getSearchPosts } from '../api/post';
import { Article } from '../components/Article';
import PropTypes from 'prop-types';

const Tag = ({ name }) =>
  <h3
    className="text-sky-500 text-base md:text-lg"
  >
    { name }
  </h3>;

export const SearchHashtag = () => {
  const query = useLoaderData();
  const { data: posts = [] } = useQuery(
    'search-posts',
    () => getSearchPosts(query),
    );

  return (
  <AppLayout>
    <section className="flex flex-col items-center">
      <div className="flex">
        { query.map(tag => <Tag name={tag} />) }
        <span className="text-base md:text-lg">로 검색하신 결과입니다.</span>
      </div>
      <span className="text-base pb-5">총 {posts.length}건</span>
    </section>
    <section>
      <article className="flex flex-col gap-y-7">
        { posts.map(post => <Article {...post} />) }
      </article>
    </section>
  </AppLayout>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};
