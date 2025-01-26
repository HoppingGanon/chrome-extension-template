type Scope = "local" | "session";

export class Store {
  constructor() {}

  async trustSession() {
    await chrome.storage.session.setAccessLevel({
      accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
    });
  }

  /**
   * ストアから値を取得する
   * @param key ストアに保存しているキー
   * @returns ストアから読みだした値
   */
  async getValue<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T = any,
  >(key: string, scope: Scope) {
    if (scope === "local") {
      return await new Promise<T>((resolve) => {
        //ストレージから保存されているデータを取得
        chrome.storage.local.get(key, (value) => {
          resolve(value[key] as T);
        });
      });
    } else if (scope === "session") {
      return await new Promise<T>((resolve) => {
        //ストレージから保存されているデータを取得
        chrome.storage.session.get(key, (value) => {
          resolve(value[key] as T);
        });
      });
    } else {
      throw "'scope'には'local'または'storage'を設定してください";
    }
  }

  /**
   * ストアに値を保存する
   * @param key ストアに保存するキー
   * @param value ストアに保存する値
   */
  async setValue<T>(key: string, value: T, scope: Scope) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {};
    obj[key] = value;
    await new Promise((resolve, reject) => {
      if (scope === "local") {
        chrome.storage.local.set(obj, () => {
          resolve(undefined);
        });
      } else if (scope === "session") {
        chrome.storage.session.set(obj, () => {
          resolve(undefined);
        });
      } else {
        reject("'scope'には'local'または'storage'を設定してください");
      }
    });
  }

  async clear(scope: Scope) {
    if (scope === "local") {
      await chrome.storage.local.clear();
    } else if (scope === "session") {
      await chrome.storage.session.clear();
    } else {
      throw "'scope'には'local'または'storage'を設定してください";
    }
  }
}

export function useStore() {
  return new Store();
}
