import { get } from "https";
import { writeFile, mkdir } from "fs/promises";

async function downloadAndSave(url, path) {
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", async () => {
        try {
          await writeFile(path, data);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}

(async () => {
  try {
    await mkdir("libs", { recursive: true });
  } catch {
    // ignore
  }
  try {
    await downloadAndSave(
      "https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css",
      "libs/daisyui@4.12.23.min.css"
    );
    await downloadAndSave(
      "https://cdn.tailwindcss.com/3.4.16",
      "libs/tailwind@3.4.16.min.css"
    );
    console.log("Files downloaded and saved successfully.");
  } catch (error) {
    console.error("Error downloading files:", error);
  }
})();
