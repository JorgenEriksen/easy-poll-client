const ACCESS_TOKEN = "accessToken";

const store = {
  get: (key) => localStorage.getItem(key),
  set: (key, data) => localStorage.setItem(key, data),
  remove: (key) => localStorage.removeItem(key),

  getAccessToken: () => store.get(ACCESS_TOKEN),
  setAccessToken: (value) => store.set(ACCESS_TOKEN, value),
  removeAccessToken: () => store.remove(ACCESS_TOKEN),
};

export default store;
