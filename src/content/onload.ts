import { useStore } from "../common/store";

async function onload() {
  const store = useStore();
  const links: string[] = [];
  document.querySelectorAll<HTMLLinkElement>("a").forEach((item) => {
    item.style.border = "4px solid red";
    links.push(item.href);
  });
  await store.setValue("links", links);
  console.log(await store.getValue("links"));
}

document.addEventListener(
  "load",
  () => {
    onload();
  },
  false
);
