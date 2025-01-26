export class Store {
  constructor() {}

  /**
   * ストアから値を取得する
   * @param key ストアに保存しているキー
   * @returns ストアから読みだした値
   */
  async getValue<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T = any,
  >(key: string) {
    return await new Promise<T>((resolve) => {
      //ストレージから保存されているデータを取得
      chrome.storage.local.get(key, (value) => {
        resolve(value[key] as T);
      });
    });
  }

  /**
   * ストアに値を保存する
   * @param key ストアに保存するキー
   * @param value ストアに保存する値
   */
  async setValue<T>(key: string, value: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {};
    obj[key] = value;
    await new Promise((resolve) => {
      chrome.storage.local.set(obj, () => {
        resolve(undefined);
      });
    });
  }
}

export function useStore() {
  return new Store();
}
