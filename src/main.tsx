import { hydrate, prerender as ssr } from "preact-iso";
import postsIndex from "@/generated/posts.json";

import App from "./App";

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  // For post pages, dynamically import the content
  if (data.url?.startsWith("/posts/")) {
    const slug = data.url.split("/")[2];
    const post = postsIndex.find((p) => p.slug === slug);

    if (post) {
      const { default: MDXContent } = await import(
        `../content/posts/${slug}.mdx`
      );

      // Pass the component via globalThis or data
      globalThis[slug] = MDXContent;
    }
  }

  return await ssr(<App {...data} />);
}
