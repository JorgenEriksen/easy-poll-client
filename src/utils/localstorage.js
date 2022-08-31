const ACCESS_TOKEN = "accessToken";

const store = {
  get: (key) => localStorage.getItem(key),
  set: (key, data) => localStorage.setItem(key, data),
  remove: (key) => localStorage.removeItem(key),
};

export const getAccessToken = () => store.get(ACCESS_TOKEN);
export const setAccessToken = (value) => store.set(ACCESS_TOKEN, value);
export const removeAccessToken = () => store.remove(ACCESS_TOKEN);

export default store;
