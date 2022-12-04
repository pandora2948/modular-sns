import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({ key: 'me', storage: localStorage });

export const meAtom = atom({
  key: 'me',
  default: {},
  effects: [persistAtom],
});

export const userInfoByUsernameAtom = atom({
  key: 'userinfo-by-username',
  default: undefined,
});

export const userProfileInfo = atom({
  key: 'user-profile-info',
  default: undefined,
});
