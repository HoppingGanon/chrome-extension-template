const btn = document.querySelector<HTMLElement>("button.test-button");
const linkList = document.querySelector("ul.link-list");

btn!.onclick = () => {
  alert("push!");
};
