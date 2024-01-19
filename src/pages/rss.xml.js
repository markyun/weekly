import rss from "@astrojs/rss";

let allPosts = import.meta.glob("./posts/*.md", { eager: true });
let posts = Object.values(allPosts);
posts = posts.sort((a, b) => {
  return (
    parseInt(b.url.split("/posts/")[1].split("-")[0]) -
    parseInt(a.url.split("/posts/")[1].split("-")[0])
  );
});

//只保留15，当前太多了
posts.splice(10);

export const get = () =>
  rss({
    title: "WebCIA Weekly",
    description: "保持领先所需的见解",
    site: "https://markyun.github.io/",
    customData: `<image><url>https://markyun.github.io/images/avatar.png</url></image>`,
    items: posts.map((item) => {
      const url = item.url;
      const oldTitle = url.split("/posts/")[1];
      const title =
        "第" + oldTitle.split("-")[0] + "期 - " + oldTitle.split("-")[1];
      return {
        link: url,
        title,
        description: item.compiledContent(),
        pubDate: item.frontmatter.date,
      };
    }),
  });
