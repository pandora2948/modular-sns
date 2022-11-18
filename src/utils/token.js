export const token = {
  accessToken: {
    key: 'ACCESS_TOKEN',

    set(v) {
      sessionStorage.setItem(this.key, v);
    },

    get() {
      return sessionStorage.getItem(this.key);
    },

    delete() {
      sessionStorage.removeItem(this.key);
    },
  },

  refreshToken: {
    key: 'REFRESH_TOKEN',
    isRemember: false,

    get storage() {
      if (this.isRemember) {
        return localStorage;
      }
      return sessionStorage;
    },

    set(v, isRemember) {
      this.isRemember = isRemember;

      this.storage.setItem(this.key, v);
    },

    get() {
      return this.storage.getItem(this.key);
    },

    delete() {
      this.storage.removeItem(this.key);
    },
  },

  clear() {
    this.accessToken.delete();
    this.refreshToken.delete();
  },
};
