export async function onload() {
  chrome.runtime.onMessage.addListener((request, _options, sendResponse) => {
    if (request.name === "displayUrl:contentScripts") {
      if (request.data?.action === "load") {
        const links: string[] = [];
        document.querySelectorAll<HTMLLinkElement>("a").forEach((item) => {
          links.push(item.href);
        });

        sendResponse({ links });
      } else if (request.data?.action === "exec") {
        (request.data?.links || []).forEach((link: string) => {
          window.open(link, "_blank");
        });
        sendResponse({});
      }
    }
  });

  if (location.href === "") {
    //
  }
}
