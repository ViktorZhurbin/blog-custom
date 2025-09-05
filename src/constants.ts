export const PATHS = {
  CONTENT_DIR: "content",
  POSTS_DIR: "content/posts",
  GENERATED_DIR: "src/generated",
  POSTS_INDEX: "src/generated/posts.json",
} as const;

export const PATTERNS = {
  MDX_FILES: "content/posts/**/*.mdx",
  MDX_FILES_REGEX: /content\/posts\/.*\.mdx$/,
} as const;

export const COLORS = {
  PURPLE: "\x1b[35m",
  RESET: "\x1b[0m",
} as const;
