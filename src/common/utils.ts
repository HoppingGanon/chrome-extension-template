export class Utils {
  async init() {
    await new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        resolve(tab);
      });
    });
  }
}

export async function useUtils() {
  const utils = new Utils();
  await utils.init();
  return utils;
}
