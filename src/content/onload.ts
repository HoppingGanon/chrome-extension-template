export async function onload() {
  chrome.runtime.onMessage.addListener((request, _options, sendResponse) => {
    if (request.name === "displayUrl:contentScripts") {
      if (request.data?.action === "load") {
        // 読み込みボタンを押したときのイベント
        let links: string[] = [];
        document.querySelectorAll<HTMLLinkElement>("a").forEach((item) => {
          links.push(item.href);
        });
        links = links.filter((item) => {
          // なんらかのフィルターを設定する場合はここに記述
          return item;
        });

        sendResponse({ links });
      } else if (request.data?.action === "exec") {
        // 開くボタンを押したときのイベント
        (request.data?.links || []).forEach((link: string) => {
          window.open(link, "_blank");
        });
        sendResponse({});
      }
    }
  });
}
