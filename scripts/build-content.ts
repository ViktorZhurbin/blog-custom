import fs from "fs-extra";
import { glob } from "tinyglobby";
import matter from "gray-matter";
import { PATHS, PATTERNS } from "../src/constants.js";
import { getSlugFromString } from "../src/utils/slug.js";

export interface Post {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  filepath: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = await glob(PATTERNS.MDX_FILES);

  const posts = files.map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const { data } = matter(content);

    return {
      title: data.title,
      date: data.date,
      tags: data.tags || [],
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
