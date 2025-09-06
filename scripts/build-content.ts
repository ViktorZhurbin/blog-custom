import fs from "fs-extra";
import { glob } from "tinyglobby";
import fm from "front-matter";
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

  const posts = files.map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const { attributes } = fm<Frontmatter>(content);

    return {
      title: attributes.title,
      date: attributes.date,
      tags: attributes.tags || [],
      slug: getSlugFromString(file),
      filepath: file,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Generate posts index for dev
export async function generatePostsIndex() {
  const posts = await getPosts();

  await fs.ensureDir(PATHS.GENERATED_DIR);
  await fs.writeJSON(PATHS.POSTS_INDEX, posts, { spaces: 2 });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePostsIndex();
}
