export const PATHS = {
  CONTENT_DIR: 'content',
  POSTS_DIR: 'content/posts',
  GENERATED_DIR: 'src/generated',
  POSTS_INDEX: 'src/generated/posts.json'
} as const

export const PATTERNS = {
  MDX_FILES: 'content/posts/**/*.mdx'
} as const