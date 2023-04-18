import type { AstroGlobal } from "astro";
import { getCollection } from "astro:content";

export async function getPrevAndNext(Astro: Readonly<AstroGlobal>) {
  const posts = await getCollection("posts");
  const links = posts.map((post) => ({
    text: post.data.title,
    pubDate: post.data.pubDate,
    link: post.slug,
  }));

  const index = links.findIndex((x) =>
    Astro.url.pathname.replace(/\/$/, "").endsWith(x.link)
  );

  return {
    previous: index > 0 ? links[index - 1] : undefined,
    next:
      index !== -1 && index < links.length - 1 ? links[index + 1] : undefined,
  };
}
