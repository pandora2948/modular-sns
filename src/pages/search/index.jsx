import PropTypes from 'prop-types';
import PostCard from 'components/post/postCard/PostCard';
import usePostListSearchedByHashtags from 'hooks/data/usePostListSearchedByHashtags';
import AppLayout from 'layouts/AppLayout';
import { isNil } from 'lodash';
import { useLoaderData } from 'react-router';
import shortid from 'shortid';

const Tag = ({ name }) => <h3 className="text-sky-500 text-base md:text-lg">{name}</h3>;

const SearchHashtag = () => {
  const hashtags = useLoaderData();
  const [posts, _setPosts] = usePostListSearchedByHashtags(hashtags);

  return (
    <AppLayout>
      {isNil(posts) ? null : (
        <>
          <section className="flex flex-col items-center py-8">
            <div className="flex gap-x-1">
              {hashtags.map((tag) => (
                <Tag key={shortid.generate()} name={tag} />
              ))}
              <span className="text-base md:text-lg">로 검색하신 결과입니다.</span>
            </div>
            <span className="text-base">총 {posts.length}건</span>
          </section>

          <section>
            <article className="flex flex-col gap-y-7">
              {posts.map((post) => (
                <PostCard key={shortid.generate()} post={post} />
              ))}
            </article>
          </section>
        </>
      )}
    </AppLayout>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchHashtag;
