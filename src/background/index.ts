chrome.runtime.onMessage.addListener((request) => {
  // 期待通りのリクエストかどうかをチェック
  if (request.name === "displayUrl:background") {
    let url;
    let id;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log({ tabs });
      url = tabs[0].url;
      id = tabs[0].id;

      // content_script へデータを送る
      chrome.tabs.sendMessage(id || 0, {
        // content_script はタブごとに存在するため ID 指定する必要がある
        name: "displayUrl:contentScripts",
        data: {
          url,
        },
      });
    });
  }
});
