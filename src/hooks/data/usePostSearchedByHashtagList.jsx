import { useCallback, useState } from 'react';
import { PostsService } from '../../api/services';
import { handleErrorByAntdMessage } from '../../utils/handler';
import { useDidMountEffect } from '../useDidMountEffect';

// TODO: pagination 기능 작성하기 2022-12-02 20:06
export default function usePostSearchedByHashtagList(hashtags) {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const posts = await PostsService.getPostsByHashtags({ hashtags }).catch(handleErrorByAntdMessage);
    setPosts(posts);
  }, [hashtags]);

  useDidMountEffect(() => getPosts());

  return [posts, setPosts];
}
