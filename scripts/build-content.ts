import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";
import { PATHS, PATTERNS } from "../src/constants.js";

export interface Post {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  filepath: string;
}

async function findMdxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMdxFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function getPosts(): Promise<Post[]> {
  const files = await findMdxFiles(PATHS.POSTS_DIR);

  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, "utf8");
      const { data } = matter(content);

      return {
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        slug: path.basename(file, ".mdx"),
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

  await fs.mkdir(PATHS.GENERATED_DIR, { recursive: true });
  await fs.writeFile(PATHS.POSTS_INDEX, JSON.stringify(posts, null, 2));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePostsIndex();
}
