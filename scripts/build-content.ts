import { mkdir, readFile, writeFile } from "node:fs/promises";
import fm from "front-matter";
import { glob } from "tinyglobby";
import { PATHS, PATTERNS } from "../src/constants.js";
import { getSlugFromString } from "../src/utils/slug.js";

interface Frontmatter {
  title: string;
  date: string;
  tags: string[];
}

export interface Post extends Frontmatter {
  slug: string;
  filepath: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = await glob(PATTERNS.MDX_FILES);

  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, "utf8");
      const { attributes } = fm<Frontmatter>(content);

      return {
        title: attributes.title,
        date: attributes.date,
        tags: attributes.tags || [],
        slug: getSlugFromString(file),
        filepath: file,
      };
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Generate posts index for dev
export async function generatePostsIndex() {
  const posts = await getPosts();

  await mkdir(PATHS.GENERATED_DIR, { recursive: true });
  await writeFile(PATHS.POSTS_INDEX, JSON.stringify(posts, null, 2));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePostsIndex();
}
