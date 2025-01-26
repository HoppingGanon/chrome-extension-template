export class Store {
  constructor() {}

  getValue(key) {
    return new Promise((resolve) => {
      //ストレージから保存されているデータを取得
      chrome.storage.local.get(key, (value) => {
        return value[key];
      });
    });
  }

  setValue(key, value) {
    const obj = {};
    obj[key] = value;
    return new Promise((resolve) => {
      chrome.storage.local.set(obj, () => {
        resolve(undefined);
      });
    });
  }
}

export function useStore() {
  return new Store();
}
