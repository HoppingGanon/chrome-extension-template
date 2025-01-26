import esbuild from "esbuild";
import fs from "fs/promises";

const distPath = `${process.cwd()}/dist`;
const srcPath = `${process.cwd()}/src`;

await esbuild.build({
  bundle: true,
  entryPoints: [`${srcPath}/popup/script.ts`],
  outfile: `${distPath}/popup/script.js`,
  // minify: true,
});
console.log("'popup/script.js'を出力しました");

await esbuild.build({
  bundle: true,
  entryPoints: [`${srcPath}/content/index.ts`],
  outfile: `${distPath}/content/index.js`,
  // minify: true,
});
console.log("'content/index.js'を出力しました");

await esbuild.build({
  bundle: true,
  entryPoints: [`${srcPath}/background/index.ts`],
  outfile: `${distPath}/background/index.js`,
  // minify: true,
});
console.log("'background/index.js'を出力しました");

// ファイルとフォルダのコピー処理
await fs.copyFile(
  `${srcPath}/popup/index.html`,
  `${distPath}/popup/index.html`
);
console.log("'popup/index.html'をコピーしました");

await fs.copyFile(`${srcPath}/popup/style.css`, `${distPath}/popup/style.css`);
console.log("'popup/style.css'をコピーしました");

await fs.copyFile(`${srcPath}/manifest.json`, `${distPath}/manifest.json`);
console.log("'manifest.json'をコピーしました");

await fs.mkdir(`${distPath}/assets`, { recursive: true });
await fs.cp(`${srcPath}/assets`, `${distPath}/assets`, { recursive: true });
console.log("'assets'フォルダをコピーしました");
