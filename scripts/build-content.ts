import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import path from "path";

export interface Post {
	title: string;
	date: string;
	tags: string[];
	slug: string;
	filepath: string;
}

export async function getPosts(): Promise<Post[]> {
	const files = await globby("content/posts/**/*.mdx");

	const posts = files.map((file) => {
		const content = fs.readFileSync(file, "utf8");
		const { data } = matter(content);

		return {
			title: data.title,
			date: data.date,
			tags: data.tags || [],
			slug: path.basename(file, ".mdx"),
			filepath: file,
		};
	});

	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

// Generate posts index for dev
export async function generatePostsIndex() {
	const posts = await getPosts();
	const indexPath = "src/generated/posts.json";

	await fs.ensureDir("src/generated");
	await fs.writeJSON(indexPath, posts, { spaces: 2 });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	generatePostsIndex();
}
