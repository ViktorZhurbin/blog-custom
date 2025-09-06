import Layout from "@/components/Layout";
import postsIndex from "@/generated/posts.json";
import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";

interface PostPageProps {
  hasPrerenderedContent?: boolean;
  slug?: string;
}

export default function PostPage({ hasPrerenderedContent }: PostPageProps) {
  const { params } = useRoute();
  const post = postsIndex.find((p) => p.slug === params.slug);

  if (!post) return <div>Post data not found</div>;

  return (
    <Layout>
      <article>
        <header>
          <h1>{post.title}</h1>
          <time>{post.date}</time>
          <div>
            {post.tags.map((tag, index) => (
              <span key={tag} className="tag">
                {tag}
                {index < post.tags.length - 1 && ", "}
              </span>
            ))}
          </div>
        </header>
        <LazyMDXContent
          slug={params.slug}
          hasPrerenderedContent={hasPrerenderedContent}
        />
      </article>
    </Layout>
  );
}

function LazyMDXContent({ slug, hasPrerenderedContent }: PostPageProps) {
  // Always call hooks first - never conditionally
  const [MDXContent, setMDXContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for prerendered content first
    if (hasPrerenderedContent && globalThis[slug]) {
      setMDXContent(() => globalThis[slug]);
      setLoading(false);
      return;
    }

    // Fallback to dynamic import
    import(`../../content/posts/${slug}.mdx`)
      .then((module) => {
        setMDXContent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        setLoading(false);
      });
  }, [slug, hasPrerenderedContent]);

  // For SSR with prerendered content, return directly to avoid loading state
  if (typeof window === "undefined" && hasPrerenderedContent && globalThis[slug]) {
    const SSRContent = globalThis[slug];
    return <SSRContent />;
  }

  if (loading) return <div>Loading post content...</div>;
  if (!MDXContent) return <div>Failed to load post</div>;

  return <MDXContent />;
}
