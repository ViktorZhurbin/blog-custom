import Layout from "@/components/Layout";
import postsIndex from "@/generated/posts.json";
import { ComponentType } from "preact";
import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";

export default function PostPage() {
  const { params } = useRoute();

  const [loading, setLoading] = useState(false);
  const [MDXContent, setMDXContent] = useState<ComponentType | null>(null);

  if (typeof window === "undefined") {
    const buildTimeMdx = globalThis[params.slug];

    if (buildTimeMdx) {
      setMDXContent(() => buildTimeMdx);
    }
  }

  const post = postsIndex.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (!post || typeof window === "undefined") return;

    setLoading(true);

    // Dynamic import of MDX file in dev (client-side)
    import(`../../content/posts/${params.slug}.mdx`)
      .then((module) => {
        setMDXContent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        setLoading(false);
      });
  }, [params.slug, post]);

  if (!post) return <div>Post data not found</div>;
  if (loading) return <div>Loading...</div>;
  if (!MDXContent) return <div>Failed to load post</div>;

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
        <MDXContent />
      </article>
    </Layout>
  );
}
