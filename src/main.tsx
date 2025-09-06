import { hydrate, prerender as ssr } from "preact-iso";
import postsIndex from "@/generated/posts.json";

import App, { type AppProps } from "./App";

interface PrerenderData {
  ssr: boolean;
  url?: string;
  route?: { url: string; _discoveredBy?: { url: string } };
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data: PrerenderData) {
  const props: AppProps = {};

  // For post pages, dynamically import the content
  if (data.url?.startsWith("/posts/")) {
    const slug = data.url.split("/")[2];
    const post = postsIndex.find((p) => p.slug === slug);

    if (post) {
      const { default: MDXContent } = await import(
        `../content/posts/${slug}.mdx`
      );

      // Store component in globalThis for SSR, but mark it as available
      globalThis[slug] = MDXContent;
      props.hasPrerenderedContent = true;
      props.slug = slug;
    }
  }

  return await ssr(<App {...props} />);
}
