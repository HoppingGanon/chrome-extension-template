chrome.runtime.onMessage.addListener((request, _options, sendResponse) => {
  // 期待通りのリクエストかどうかをチェック
  if (request.name === "displayUrl:background") {
    let id;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      id = tabs[0]?.id;

      // content_script へデータを送る
      chrome.tabs.sendMessage(
        id || 0,
        {
          // content_script はタブごとに存在するため ID 指定する必要がある
          name: "displayUrl:contentScripts",
          data: {},
        },
        (res) => {
          console.log(`bg: ${JSON.stringify(res)}`);
          sendResponse(res);
        }
      );
    });
    return true;
  }
});
