import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import postsIndex from "@/generated/posts.json";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const post = postsIndex.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;

    // Dynamic import of MDX file
    import(`../../content/posts/${slug}.mdx`)
      .then((module) => {
        setMDXContent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        setLoading(false);
      });
  }, [slug, post]);

  if (!post) return <div>Post not found</div>;
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
