class Store {
  constructor() {
    this.db;
    this.initialize();
  }

  static instance = null;

  initialize() {
    let request = window.indexedDB.open('References Store');

    request.onsuccess = (event) => {
      this.db = event.target.result;
    };

    request.onerror = (event) => {
      this.db = event.target.error;
    };

    request.onupgradeneeded = (event) => {
      let db = event.target.result;

      db.createObjectStore('store1', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };
  }

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  add(text) {
    const store = this.db
      .transaction('store1', 'readwrite')
      .objectStore('store1');

    const request = store.add({ text });
    request.onsuccess = function (event) {
      console.log(event.target.result);
    };
  }
}

export const getStore = () => {
  return Store.getInstance();
};
