import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({ key: 'me', storage: localStorage });

export const meAtom = atom({
  key: 'me',
  default: {},
  effects: [persistAtom],
});
