import { useStore } from "../common/store";

export async function onload() {
  const store = useStore();
  const links: string[] = [];
  document.querySelectorAll<HTMLLinkElement>("a").forEach((item) => {
    links.push(item.href);
  });
  await store.setValue("links", links, "session");
}

chrome.runtime.onMessage.addListener((request, _options) => {
  if (request.name === "displayUrl:contentScripts") {
    const body = document.querySelector("body");
    const addElement = document.createElement("h1");

    // 受け取った URL を画面に表示する
    addElement.textContent = `URL is ${request.data.url}`;

    body?.prepend(addElement);
  }
});
