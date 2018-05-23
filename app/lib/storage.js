const storage = window.localStorage;

export default {

  set(name, value) {

    if (typeof value === 'object') {
      storage.setItem(name, JSON.stringify(value));
    } else {
      storage.setItem(name, value);
    }
  },

  get(name) {
    const store = storage.getItem(name);

    if (store === null) {
      return null;
    }

    return JSON.parse(store);
  },

  clear(name) {
    if (name) {
      storage.removeItem(name);
    } else {
      storage.clear();
    }
  }
};
