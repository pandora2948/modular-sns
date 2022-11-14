import PropTypes from 'prop-types';
import { PostsService } from 'api/services';
import Article from 'components/article/Article';
import AppLayout from 'layouts/AppLayout';
import { useQuery } from 'react-query';
import { useLoaderData } from 'react-router';
import shortid from 'shortid';

const Tag = ({ name }) => <h3 className="text-sky-500 text-base md:text-lg">{name}</h3>;

const SearchHashtag = () => {
  const query = useLoaderData();
  const { data: posts = [] } = useQuery('search-posts', async () => {
    return await PostsService.getSearchPosts(query);
  });

  return (
    <AppLayout>
      <section className="flex flex-col items-center py-8">
        <div className="flex gap-x-1">
          {query.map((tag) => (
            <Tag key={shortid.generate()} name={tag} />
          ))}
          <span className="text-base md:text-lg">로 검색하신 결과입니다.</span>
        </div>
        <span className="text-base">총 {posts.length}건</span>
      </section>

      <section>
        <article className="flex flex-col gap-y-7">
          {posts.map((post) => (
            <Article key={shortid.generate()} {...post} />
          ))}
        </article>
      </section>
    </AppLayout>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchHashtag;
