export function getSlugFromString(str: string): string {
  const match = str.match(/\/posts\/([^/]+)/);
  if (!match) return "";

  // Strip .md or .mdx extension
  return match[1].replace(/\.mdx?$/, "");
}

/**
 * Create a post URL from a slug
 * @param slug - The post slug like "hello-world"
 * @returns url - URL path like "/posts/hello-world"
 */
export function createPostUrl(slug: string): string {
  return `/posts/${slug}`;
}
