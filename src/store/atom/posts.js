import { atom } from 'recoil';

const posts = {
  postsAtom: atom({ key: 'posts', default: [] }),
};

export default posts;
