export async function onload() {
  chrome.runtime.onMessage.addListener((request, _options, sendResponse) => {
    if (request.name === "displayUrl:contentScripts") {
      const links: string[] = [];
      document.querySelectorAll<HTMLLinkElement>("a").forEach((item) => {
        links.push(item.href);
      });

      sendResponse({ links });
    }
  });
}
