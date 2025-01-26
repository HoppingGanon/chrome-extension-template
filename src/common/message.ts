export class Message<T> {
  private _messages: Record<string, T>;
  constructor(initialMessages: Record<string, T>) {
    this._messages = initialMessages;
  }

  async listen() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const actions = Object.keys(this._messages);

      if (!actions.includes(message.action)) {
        throw `不明なアクション'${message.action}'を受信しました\n対応できるアクションは'${actions.join("', '")}'です`;
      }

      if (message.action === "") {
        const tabId = sender.tab?.id;
        if (tabId) {
          sendResponse({ success: true, tabId });
        } else {
          sendResponse({ success: false, error: "No tabId found" });
        }
        return true;
      }
    });
  }
}
