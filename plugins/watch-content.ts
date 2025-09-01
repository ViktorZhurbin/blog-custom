import type { Plugin } from "vite";
import { generatePostsIndex } from "../scripts/build-content.js";
import { PATTERNS, COLORS } from "../src/constants.js";

export function watchContent(): Plugin {
  return {
    name: "watch-content",
    configureServer(server) {
      server.watcher.add(PATTERNS.MDX_FILES);
      server.watcher.on("change", async (file) => {
        if (PATTERNS.MDX_FILES_REGEX.test(file)) {
          console.log(
            `${COLORS.PURPLE}MDX files changed, rebuilding posts index...${COLORS.RESET}`,
          );

          await generatePostsIndex();

          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}
