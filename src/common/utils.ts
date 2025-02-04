export async function getTab() {
  return await new Promise<chrome.tabs.Tab[]>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      resolve(tab);
    });
  });
}
