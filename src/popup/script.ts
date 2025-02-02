import { useStore } from "@common/store";
import { getTab } from "@common/utils";

async function init() {
  const store = useStore();

  const loadBtn = document.querySelector<HTMLElement>("button.load-button");
  const execBtn = document.querySelector<HTMLElement>("button.exec-button");
  const linkUl = document.querySelector("div.link-list");
  const tabName = document.querySelector<HTMLSpanElement>("span.tab-name");

  if (tabName) tabName.innerText = (await getTab())[0].title || "-";

  const links: string[] = [];

  loadBtn!.onclick = async () => {
    await chrome.runtime.sendMessage(
      {
        name: "displayUrl:background",
        data: {
          action: "load",
        },
      },
      (res) => {
        const receivedLinks = res.links as string[];

        receivedLinks.forEach((link) => {
          const li = document.createElement("li");
          li.innerText = link;
          linkUl?.appendChild(li);
          links.push(link);
        });
      }
    );
  };

  execBtn!.onclick = async () => {
    await chrome.runtime.sendMessage(
      {
        name: "displayUrl:background",
        data: {
          action: "exec",
          links: links.filter((_, i) => i < 5),
        },
      },
      (_res) => {}
    );
  };
}

init();
