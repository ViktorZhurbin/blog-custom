import Layout from "@/components/Layout";
import postsIndex from "@/generated/posts.json";

export default function HomePage() {
  return (
    <Layout>
      <section>
        <h1>Welcome to My DIY Blog</h1>
        <p>A simple, fast blog built from scratch</p>

        <h2>Recent Posts</h2>
        <div>
          {postsIndex.map((post) => (
            <article key={post.slug}>
              <h3>
                <a href={`/posts/${post.slug}`}>{post.title}</a>
              </h3>
              <time>{post.date}</time>
              <div>
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
