import { useStore } from "@common/store";
import { getTab } from "@common/utils";

async function init() {
  const store = useStore();

  const loadBtn = document.querySelector<HTMLElement>("button.load-button");
  const execBtn = document.querySelector<HTMLElement>("button.exec-button");
  const linkBlock = document.querySelector("div.link-list");
  const tabName = document.querySelector<HTMLSpanElement>("span.tab-name");
  const loadCount =
    document.querySelector<HTMLSelectElement>("select.load-count");

  if (tabName) tabName.innerText = (await getTab())[0].title || "-";

  const links: string[] = [];

  loadBtn!.onclick = async () => {
    // 読み込みボタン押下イベント
    await chrome.runtime.sendMessage(
      {
        name: "displayUrl:background",
        data: {
          action: "load",
        },
      },
      (res) => {
        const receivedLinks = res.links as string[];
        linkBlock!.innerHTML = ""; // ループ前に子要素をすべて削除

        receivedLinks.forEach((link) => {
          const item = document.createElement("div");
          item.innerText = link;
          linkBlock!.appendChild(item);
          links.push(link);
        });

        execBtn!.classList.remove("hidden");
        loadCount!.classList.remove("hidden");
      }
    );
  };

  execBtn!.onclick = async () => {
    // 開くボタン押下イベント
    const selectedValue = Number(loadCount?.value || "5");
    const openList = links.filter((_, i) => i < selectedValue);
    await chrome.runtime.sendMessage(
      {
        name: "displayUrl:background",
        data: {
          action: "exec",
          links: openList,
        },
      },
      (_res) => {
        openList.forEach((link) => {
          const childNodes = Array.from(linkBlock!.childNodes);
          childNodes.forEach((child) => {
            if (child instanceof HTMLElement && child.innerText === link) {
              linkBlock!.removeChild(child);
            }
          });
        });
      }
    );
  };
}

init();
