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
    title: 'WebCIA Weekly',
    description: 'feedId:63404283121618946+userId:63253081063695360',
    site: 'https://markyun.github.io/weekly/',
    customData: `<image><url>https://markyun.github.io/weekly/assets/WebCIA.svg</url></image>`,
    items: posts.map((item) => {
      const url = item.url;
      const oldTitle = url.split("/posts/")[1];
      const title =
        "第" + oldTitle.split("-")[0] + "期 - " + oldTitle.split("-")[1];
      return {
        title,
        link: url,
        pubDate: item.frontmatter.date,
        description: item.compiledContent(),
      };
    }),
  });
