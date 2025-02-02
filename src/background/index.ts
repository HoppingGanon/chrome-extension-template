chrome.runtime.onMessage.addListener((request, _options, sendResponse) => {
  // 期待通りのリクエストかどうかをチェック
  if (request.name === "displayUrl:background") {
    let id;

    if (request.data?.action === "load") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        id = tabs[0]?.id;

        // content_script へデータを送る
        chrome.tabs.sendMessage(
          id || 0,
          {
            // content_script はタブごとに存在するため ID 指定する必要がある
            name: "displayUrl:contentScripts",
            data: {
              action: "load",
            },
          },
          (res) => {
            sendResponse(res);
          }
        );
      });
    } else if (request.data?.action === "exec") {
      // content_script へデータを送る
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        id = tabs[0]?.id;
        chrome.tabs.sendMessage(
          id || 0,
          {
            // content_script はタブごとに存在するため ID 指定する必要がある
            name: "displayUrl:contentScripts",
            data: {
              action: "exec",
              links: request.data?.links,
            },
          },
          (res) => {
            sendResponse(res);
          }
        );
      });
    }
    return true;
  }
});
