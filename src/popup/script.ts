import { useStore } from "@common/store";
import { getTab } from "@common/utils";

async function init() {
  const store = useStore();

  const btn = document.querySelector<HTMLElement>("button.test-button");
  const linkUl = document.querySelector("ul.link-list");
  const tabName = document.querySelector<HTMLSpanElement>("span.tab-name");

  if (tabName) tabName.innerText = (await getTab())[0].title || "-";

  btn!.onclick = () => {
    chrome.runtime.sendMessage({ name: "displayUrl:background" });
  };

  const links = (await store.getValue<string[]>("links", "session")) || [];

  links.forEach((link) => {
    const li = document.createElement("li");
    li.innerText = link;
    linkUl?.appendChild(li);
  });
}

init();
