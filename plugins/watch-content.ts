import type { Plugin } from "vite";
import { generatePostsIndex } from "../scripts/build-content.js";
import { PATTERNS } from "../src/constants.js";

export function watchContent(): Plugin {
  return {
    name: "watch-content",
    configureServer(server) {
      server.watcher.add(PATTERNS.MDX_FILES);
      server.watcher.on("change", async (file) => {
        if (file.includes("content/") && file.endsWith(".mdx")) {
          console.log("MDX file changed, rebuilding posts index...");
          await generatePostsIndex();
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}
